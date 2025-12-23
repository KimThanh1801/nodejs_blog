import { CreatePostDto } from './dto/posts.dto.js';

interface Post extends CreatePostDto {
  id: number;
}

export const posts: Post[] = [];

export const create = async (data: CreatePostDto) => {
  const newPost: Post = { ...data, id: posts.length + 1 };
  posts.push(newPost);
  return newPost;
};

export const getAll = async () => {
  return posts;
};
