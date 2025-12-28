import { Request, Response } from 'express';
import { PostService } from './posts.service';

export class PostController {
  static async create(req: Request, res: Response) {
    try {
      console.log("REQ.BODY:", req.body);
      console.log("REQ.FILE:", req.file);

      const post = await PostService.create({
        title: req.body.title || 'Bài viết mới',
        content: req.body.content,
        image: req.file?.filename,
        authorId: Number(req.body.userId),
      });

      res.status(201).json(post);
    } catch (err: any) {
      console.error("CREATE POST ERROR:", err);

      // Trả về chi tiết lỗi để debug
      res.status(500).json({
        message: 'Create post failed',
        error: err.message,
        stack: err.stack
      });
    }
  }


  static async getAll(req: Request, res: Response) {
    const posts = await PostService.findAll();
    res.json(posts);
  }

  static async getById(req: Request, res: Response) {
    const post = await PostService.findById(Number(req.params.id));
    res.json(post);
  }

  static async update(req: Request, res: Response) {
    try {
      const postId = Number(req.params.id);

      const existingPost = await PostService.findById(postId);
      if (!existingPost) return res.status(404).json({ message: "Post not found" });

      const updatedPost = await PostService.update(postId, {
        title: req.body.title || existingPost.title,
        content: req.body.content,
        image: req.file ? req.file.filename : existingPost.image,
      });

      res.json(updatedPost);
    } catch (err: any) {
      console.error("UPDATE POST ERROR:", err);
      res.status(500).json({ message: "Update failed", error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    await PostService.delete(Number(req.params.id));
    res.json({ message: 'Deleted' });
  }
}
