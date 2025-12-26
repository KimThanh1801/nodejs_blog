import { Request, Response } from 'express';
import { CommentService } from './comments.service';

export class CommentController {
  static async create(req: Request, res: Response) {
    const comment = await CommentService.create({
      content: req.body.content,
      postId: Number(req.body.postId),
    //   authorId: req.user.id,
        authorId: req.body.userId, // testing
    });
    res.status(201).json(comment);
  }

  static async getByPost(req: Request, res: Response) {
    const comments = await CommentService.findByPost(
      Number(req.params.postId)
    );
    res.json(comments);
  }

  static async update(req: Request, res: Response) {
    const comment = await CommentService.update(
      Number(req.params.id),
      req.body.content
    );
    res.json(comment);
  }

  static async delete(req: Request, res: Response) {
    await CommentService.delete(Number(req.params.id));
    res.json({ message: 'Deleted' });
  }
}
