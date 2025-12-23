import axios from "axios";

const API_URL = "http://localhost:3000/posts";

export const PostService = {
  getAll: () => axios.get(API_URL),
  create: (data: { title: string; content?: string }) =>
    axios.post(API_URL, data),
  like: (id: number) => axios.post(`${API_URL}/${id}/like`),
  comment: (id: number, content: string) =>
    axios.post(`${API_URL}/${id}/comments`, { content }),
};
