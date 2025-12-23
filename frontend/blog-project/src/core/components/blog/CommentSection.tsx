import { useEffect, useState } from "react";
import { Avatar, Button, Input, List, message } from "antd";
import { commentPost, getComments } from "../../../api/postAPI";
interface Props {
  postId: number;
  initialComments?: Comment[];
}
interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt?: string;
}

export default function CommentSection({ postId, initialComments = [] }: Props) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const fetchComments = async () => {
    try {
      const data = await getComments(postId);
      let commentList: Comment[] = [];
      if (Array.isArray(data)) {
        commentList = data;
      } else if (data && Array.isArray((data as any).comments)) {
        commentList = (data as any).comments;
      }
      setComments(commentList);
    } catch (err: any) {
      message.error(err.message || "Lỗi khi tải bình luận");
    }
  };
  const handleAdd = async () => {
    if (!value.trim()) return;
    setLoading(true);
    try {
      const newComment = await commentPost(postId, "Bạn", value);
      const commentWithId: Comment = {
        id: newComment.id || Date.now(),
        author: newComment.author,
        content: newComment.content,
        createdAt: newComment.createdAt || new Date().toISOString(),
      };
      setComments([...comments, commentWithId]);
      setValue("");
    } catch (err: any) {
      message.error(err.message || "Gửi bình luận thất bại");
    } finally {
      setLoading(false);
    }
  };
  const displayComments = showAll ? comments : comments.slice(0, 3);
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <Avatar>B</Avatar>
        <Input
          placeholder="Viết bình luận..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onPressEnter={handleAdd}
          disabled={loading}
        />
        <Button type="primary" onClick={handleAdd} loading={loading}>
          Gửi
        </Button>
      </div>
      <List
        dataSource={displayComments}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{item.author[0]}</Avatar>}
              title={item.author}
              description={item.content}
            />
          </List.Item>
        )}
      />
      {!showAll && comments.length > 3 && (
        <Button type="link" onClick={() => setShowAll(true)}>
          Xem tất cả {comments.length} bình luận
        </Button>
      )}
    </div>
  );
}
