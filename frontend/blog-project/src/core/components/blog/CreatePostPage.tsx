
import { useState, useRef, useEffect } from "react";
import { Avatar, Button, Modal, Typography, Divider, message } from "antd";
import { UserPlus, ImageIcon, Smile, MapPin, Video, Type, Camera } from "lucide-react";
import { createPost, editPost, type Post } from "../../../api/postAPI";
const { Text } = Typography;
interface Props {
  visible: boolean;
  onClose: () => void;
  postToEdit?: Post;
  onPostCreated?: () => void;
}
export default function CreatePostPageModal({ visible, onClose, postToEdit, onPostCreated }: Props) {
  const [postContent, setPostContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const emojis = ["😀", "😍", "😢", "😎", "🎉", "💖", "🔥", "👏", "🥳"];
  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title || "");
      setPostContent(postToEdit.content || "");
      setSelectedEmoji(postToEdit.emoji || "");
      setImagePreview(postToEdit.image || null);
      setSelectedImage(null);
    } else {
      setTitle("");
      setPostContent("");
      setSelectedEmoji("");
      setImagePreview(null);
      setSelectedImage(null);
    }
  }, [postToEdit]);

  const handlePost = async () => {
    if (!postContent.trim() && !selectedEmoji && !selectedImage && !imagePreview) return;
    setLoading(true);

    try {
      // Chỉ gửi file mới nếu có
      const imageToSend = selectedImage || undefined;

      if (postToEdit) {
        await editPost(postToEdit.id, postContent, imageToSend, selectedEmoji);
        message.success("Cập nhật bài viết thành công");
      } else {
        await createPost({ userId: 1, content: postContent }, selectedImage || undefined, selectedEmoji);
        message.success("Đăng bài viết thành công");
      }

      onClose();
      onPostCreated?.();
    } catch (err: any) {
      message.error(err.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = () => imageInputRef.current?.click();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleEmojiSelect = (emoji: string) => { setSelectedEmoji(emoji); setShowEmojiPicker(false); };
  return (
    <Modal open={visible} onCancel={onClose} footer={null} width={600} centered style={{ borderRadius: 12 }}>
      <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0" }}>

        <Text strong style={{ fontSize: 18 }}>{postToEdit ? "Chỉnh sửa bài viết" : "Tạo bài viết"}</Text>
        <Button type="primary" loading={loading} disabled={!postContent.trim() && !selectedEmoji && !selectedImage && !imagePreview} onClick={handlePost}>
          {postToEdit ? "Lưu" : "Đăng"}
        </Button>
      </div>
      <div style={{ padding: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <Avatar size={48} src="/placeholder.svg">HK</Avatar>
        <div>
          <Text strong>Hồ Kim Thanh</Text>
          <div><Button type="text" size="small" icon={<UserPlus size={14} />} style={{ padding: 0, color: "#1677ff" }}>Bạn bè</Button></div>
        </div>
      </div>
      <Divider style={{ margin: 0 }} />
      <div style={{ padding: 16 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề bài viết"
          style={{
            width: "100%",
            fontSize: 18,
            fontWeight: 500,
            border: "none",
            outline: "none",
            marginBottom: 12
          }}
        />
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Bạn đang nghĩ gì?"
          autoFocus
          style={{ width: "100%", minHeight: 120, border: "none", resize: "none", fontSize: 16, outline: "none" }}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            style={{
              width: "50%",
              maxHeight: 250,
              objectFit: "cover",
              borderRadius: 8,
              marginTop: 8,
            }}
          />
        )}
        {selectedEmoji && <div style={{ fontSize: 24, marginTop: 8 }}>{selectedEmoji}</div>}
      </div>
      <Divider style={{ margin: 0 }} />
      <div style={{ padding: 12, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        <ActionButton icon={<ImageIcon />} label="Ảnh/Video" color="#52c41a" onClick={handleImageClick} />
        <input type="file" accept="image/*" ref={imageInputRef} style={{ display: "none" }} onChange={handleImageChange} />
        <ActionButton icon={<Smile />} label="Cảm xúc" color="#faad14" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
        {showEmojiPicker && <div style={{ gridColumn: "span 3", display: "flex", gap: 8, marginTop: 8 }}>{emojis.map(e => <span key={e} style={{ fontSize: 24, cursor: "pointer" }} onClick={() => handleEmojiSelect(e)}>{e}</span>)}</div>}
        <ActionButton icon={<MapPin />} label="Check in" color="#ff4d4f" />
        <ActionButton icon={<Video />} label="Video trực tiếp" color="#ff4d4f" />
        <ActionButton icon={<Type />} label="Màu nền" color="#13c2c2" />
        <ActionButton icon={<Camera />} label="Camera" color="#1677ff" />
      </div>
    </Modal>
  );
}
function ActionButton({ icon, label, color, onClick }: { icon: React.ReactNode; label: string; color: string; onClick?: () => void }) {
  return (
    <Button type="text" onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: 8, border: "1px solid #f0f0f0", height: 40, justifyContent: "center" }}>
      <span style={{ color }}>{icon}</span>
      <Text>{label}</Text>
    </Button>
  )
}