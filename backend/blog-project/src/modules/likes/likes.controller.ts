import { Request, Response } from 'express';
import { LikeService } from './likes.service';

export class LikeController {
    static async like(req: Request, res: Response) {
        await LikeService.like(
            // req.user.id,
            req.body.userId,
            Number(req.params.postId)
        );
        res.json({ message: 'Liked' });
    }

    static async unlike(req: Request, res: Response) {
        await LikeService.unlike(
            //   req.user.id,
            req.body.userId,
            Number(req.params.postId)
        );
        res.json({ message: 'Unliked' });
    }

    static async count(req: Request, res: Response) {
        const total = await LikeService.count(
            Number(req.params.postId)
        );
        res.json({ total });
    }
}
