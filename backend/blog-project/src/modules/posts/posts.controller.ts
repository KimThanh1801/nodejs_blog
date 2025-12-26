import { Request, Response } from 'express';
import { PostService } from './posts.service';

export class PostController {
  static async create(req: Request, res: Response) {
    try {
      const post = await PostService.create({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        // authorId: req.user.id, // lấy từ auth middleware
        authorId: req.body.userId // testing
      });
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json({ message: 'Create post failed' });
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
    const post = await PostService.update(
      Number(req.params.id),
      req.body
    );
    res.json(post);
  }

  static async delete(req: Request, res: Response) {
    await PostService.delete(Number(req.params.id));
    res.json({ message: 'Deleted' });
  }
}
