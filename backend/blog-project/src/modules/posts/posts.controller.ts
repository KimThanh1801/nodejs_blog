import { Request, Response } from 'express';
import { PostService } from './posts.service.js';

const postService = new PostService();

export class PostController {
  // API: Lấy tất cả bài viết
  async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await postService.getAllPosts();
      res.json(posts);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  // API: Lấy bài viết theo ID
  async getPostById(req: Request, res: Response) {
    const postId = parseInt(req.params.id, 10);
    try {
      const post = await postService.getPostById(postId);
      res.json(post);
    } catch (error: any) {
      res.status(404).send(error.message);
    }
  }

  // API: Tạo bài viết mới
  async createPost(req: Request, res: Response) {
    const { title, content, authorId } = req.body;
    try {
      const post = await postService.createPost({ title, content, authorId });
      res.status(201).json(post);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  // API: Cập nhật bài viết
  async updatePost(req: Request, res: Response) {
    const postId = parseInt(req.params.id, 10);
    const { title, content, published } = req.body;
    try {
      const post = await postService.updatePost(postId, { title, content, published });
      res.json(post);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  // API: Xóa bài viết
  async deletePost(req: Request, res: Response) {
    const postId = parseInt(req.params.id, 10);
    try {
      const post = await postService.deletePost(postId);
      res.json(post);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
}
