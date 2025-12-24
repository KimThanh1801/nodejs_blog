import { Request, Response } from 'express';
import { PostService } from './posts.service';

export const PostController = {
  create: async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body;
      // const authorId = req.user.id; // giả sử đã có middleware auth
      const authorId = req.body.authorId; // tạm thời lấy từ body cho ví dụ
      const post = await PostService.createPost(authorId, title, content);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Create post failed', error });
    }
  },

  getAll: async (_req: Request, res: Response) => {
    const posts = await PostService.getAllPosts();
    res.json(posts);
  },

  getById: async (req: Request, res: Response) => {
    const postId = Number(req.params.id);
    const post = await PostService.getPostById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  },

  update: async (req: Request, res: Response) => {
    const postId = Number(req.params.id);
    const post = await PostService.updatePost(postId, req.body);
    res.json(post);
  },

  delete: async (req: Request, res: Response) => {
    const postId = Number(req.params.id);
    await PostService.deletePost(postId);
    res.status(204).send();
  },
};