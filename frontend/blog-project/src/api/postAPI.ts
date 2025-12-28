import { axiosClient } from "./axiosClient";


export interface Comment {
    id: number;
    author: string;
    content: string;
    createdAt: string;
}

export interface Post {
    id: number;
    userId: number;
    content: string;
    image?: string;
    emoji?: string;
    createdAt: string;
    comments?: Comment[];
    likes?: number;
    shares?: number;
    title?: string;
}

/* ===== LẤY BÀI VIẾT ===== */
export const getPosts = async () => {
  const res = await axiosClient.get("/posts");
  return res.data;
};

/* ===== TẠO BÀI VIẾT ===== */
export const createPost = async (
  data: { userId: number; content: string },
  image?: File,
  emoji?: string
) => {
  const formData = new FormData();
  formData.append("userId", String(data.userId));
  formData.append("content", data.content);
  if (emoji) formData.append("emoji", emoji);
  if (image) formData.append("image", image);

  const res = await axiosClient.post("/posts", formData);
  return res.data;
};

/* ===== SỬA ===== */
export const editPost = async (
  postId: number,
  content: string,
  image?: File,
  emoji?: string
) => {
  const formData = new FormData();
  formData.append("content", content);
  if (emoji) formData.append("emoji", emoji);
  if (image) formData.append("image", image);

  const res = await axiosClient.put(`/posts/${postId}`, formData);
  return res.data;
};

/* ===== XÓA ===== */
export const deletePost = async (postId: number) => {
  const res = await axiosClient.delete(`/posts/${postId}`);
  return res.data;
};

/* ===== COMMENT ===== */
export const commentPost = async (postId: number, content: string) => {
  const res = await axiosClient.post(
    `/posts/${postId}/comments`,
    { content }
  );
  return res.data;
};

export const getComments = async (postId: number) => {
  const res = await axiosClient.get(`/posts/${postId}/comments`);
  return res.data;
};

export const likePost = async (postId: number) => {
  const res = await axiosClient.post(`/posts/${postId}/like`);
  return res.data;
};
