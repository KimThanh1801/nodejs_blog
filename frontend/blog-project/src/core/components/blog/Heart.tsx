import { useState } from "react";
import { axiosClient } from "../../../api/axiosClient";
import { Button, message } from "antd";
import { HeartIcon } from "lucide-react";
interface HeartProps {
  postId: number;
  initialLikes: number;
  onLike?: (newCount: number) => void;
}
export default function Heart({ postId, initialLikes, onLike }: HeartProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const userId = 1;
  const handleLike = async () => {
    try {
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);

      const res = await axiosClient.post(`/posts/${postId}/like`, { userId });

      const serverLikes = res.data.likes ?? (newIsLiked ? likeCount + 1 : likeCount - 1);
      setLikeCount(serverLikes);
      if (onLike) onLike(serverLikes);

    } catch (err: any) {
      setIsLiked(!isLiked);
      message.error(err.message || "Thích bài viết thất bại");
    }
  };
  return (
    <Button
      type="text"
      htmlType="button"
      onClick={handleLike}
      style={{ display: "flex", alignItems: "center", gap: 4 }}
    >
      <HeartIcon color={isLiked ? "red" : undefined} />
      {likeCount}
    </Button>
  );
}
