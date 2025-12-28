import { Request, Response } from 'express';
import { CommentService } from './comments.service';
export class CommentController {
  static async create(req: Request, res: Response) {
    const postId = Number(req.params.postId);
    const { content, userId } = req.body;

    if (isNaN(postId)) {
      return res.status(400).json({ message: "postId không hợp lệ" });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Nội dung comment rỗng" });
    }

    const comment = await CommentService.create({
      content,
      postId,
      authorId: userId || 1,
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
