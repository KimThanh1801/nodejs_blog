import { Card, Avatar, Button, Row, Typography, Dropdown, message, type MenuProps } from "antd";
import { MessageCircle, Share2, MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import { useState, useRef } from "react";
import CommentSection from "./CommentSection";
import Heart from "./Heart";
import { deletePost, likePost } from "../../../api/postAPI";
const { Text } = Typography;
interface Comment {
  id: number;
  author: string | { name: string };
  content: string | { text: string };
  createdAt?: string;
}
interface Props {
  postId: number;
  author: { name: string; avatar: string; time: string };
  content: string;
  image?: string;
  emoji?: string;
  likes: number;
  commentCount: number;
  comments: Comment[];
  shares: number;
  onDelete?: (postId: number) => void;
  onEdit?: (post: { postId: number; content: string; emoji?: string; image?: string }) => void;
}

export default function PostCard({ postId, author, content, image, emoji, likes, commentCount, comments, shares, onDelete, onEdit }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const commentRef = useRef<HTMLDivElement>(null);

  const safeContent = typeof content === "string" ? content : JSON.stringify(content);
  const safeAuthor = typeof author.name === "string" ? author.name : "Bạn";
  const normalizedComments = comments.map(c => ({
    ...c,
    author: typeof c.author === "string" ? c.author : String(c.author?.name || "Bạn"),
    content: typeof c.content === "string" ? c.content : String(c.content?.text || ""),
  }));

  const handleLike = async () => {
    try {
      const data = await likePost(postId);
      setLikeCount(typeof data.likes === "number" ? data.likes : likeCount);
      setIsLiked(!isLiked);
    } catch (err: any) {
      message.error(err.message || "Thích bài viết thất bại");
    }
  };

  const openComments = () => {
    setShowComments(true);
    setTimeout(() => commentRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const handleEdit = () => { if (onEdit) onEdit({ postId, content, emoji, image }); };
  const handleDelete = async () => {
    try {
      await deletePost(postId);
      message.success("Xóa bài viết thành công");
      if (onDelete) onDelete(postId);
    } catch (err: any) { message.error(err.message || "Xóa bài viết thất bại"); }
  };

  const menuItems: MenuProps["items"] = [
    { key: "edit", label: "Chỉnh sửa", icon: <Edit2 size={16} />, onClick: handleEdit },
    { key: "delete", label: "Xóa bài viết", icon: <Trash2 size={16} />, onClick: handleDelete },
  ];

  return (
    <Card style={{ marginBottom: 16, borderRadius: 12, boxShadow: "0 6px 16px rgba(0,0,0,0.15)" }}>
      <Row justify="space-between" align="middle">
        <Row align="middle" gutter={8}>
          <Avatar src={author.avatar} />
          <div>
            <Text strong>{safeAuthor}</Text>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>{String(author.time || "")}</Text>
            </div>
          </div>
        </Row>

        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <Button type="text" icon={<MoreHorizontal />} />
        </Dropdown>
      </Row>

      <div style={{ marginTop: 12 }}>
        <p>{safeContent}</p>
        {emoji && <span style={{ fontSize: 24 }}>{emoji}</span>}
        {image && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <img
              src={`http://localhost:5000/uploads/${image}`}
              alt="Post Image"
              style={{
                width: "50%",
                height: "50%",
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          </div>
        )}
      </div>
      <Row justify="space-between" style={{ marginTop: 12 }}>
        <Text type="secondary">{likeCount} lượt thích</Text>
        <Text type="secondary" style={{ cursor: "pointer" }} onClick={openComments}>
          {commentCount} bình luận · {shares} chia sẻ
        </Text>
      </Row>

      <Row justify="space-around" style={{ borderTop: "1px solid #eee", marginTop: 12, paddingTop: 8 }}>
        <Heart
          postId={postId}
          initialLikes={likeCount}
          onLike={(newCount) => setLikeCount(newCount)}
        />
        <Button type="text" onClick={() => setShowComments(!showComments)}><MessageCircle /> Bình luận</Button>
        <Button type="text"><Share2 /> Chia sẻ</Button>
      </Row>

      {showComments && (
        <div ref={commentRef} style={{ marginTop: 12 }}>
          <CommentSection postId={postId} initialComments={normalizedComments} />
        </div>
      )}
    </Card>
  );
}
