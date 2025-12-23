
import { useState, useEffect } from "react";
import CreatePostPageModal from "./CreatePostPage";
import { Card, Input, Avatar, Space, Button, message } from "antd";
import { EditOutlined, VideoCameraOutlined, PictureOutlined, SmileOutlined } from "@ant-design/icons";
const PINK = "#ff4d8d";
interface Props {
  onPostCreated?: () => void;
}
export default function CreatePost({ onPostCreated }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Card style={{ marginBottom: 24, borderRadius: 14, border: "1px solid #ffb3cc", boxShadow: "0 8px 20px rgba(255, 77, 141, 0.25)" }}>
        <Space align="start" style={{ width: "100%" }}>
          <Avatar size={40} style={{ background: PINK, fontWeight: "bold" }}>HK</Avatar>
          <Input
            placeholder="Bạn đang nghĩ gì?"
            style={{ borderRadius: 999, background: "#f5f5f5" }}
            prefix={<EditOutlined />}
            readOnly
            onClick={() => setIsModalOpen(true)}
          />
        </Space>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: 16, paddingTop: 12, borderTop: "1px solid #f0f0f0" }}>
          <Button type="text" icon={<VideoCameraOutlined style={{ color: "#f5222d" }} />}>Video trực tiếp</Button>
          <Button type="text" icon={<PictureOutlined style={{ color: PINK }} />} onClick={() => setIsModalOpen(true)}>Ảnh / Video</Button>
          <Button type="text" icon={<SmileOutlined style={{ color: "#faad14" }} />} onClick={() => setIsModalOpen(true)}>Cảm xúc</Button>
        </div>
      </Card>
      <CreatePostPageModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={onPostCreated}
      />
    </>
  );
}