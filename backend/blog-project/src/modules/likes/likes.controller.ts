import { Request, Response } from 'express';
import { LikeService } from './likes.service';

export class LikeController {
   static async like(req: Request, res: Response) {
    const likes = await LikeService.count(Number(req.params.postId));
    res.json({ message: 'Liked', likes });
}

static async unlike(req: Request, res: Response) {
    const likes = await LikeService.count(Number(req.params.postId));
    res.json({ message: 'Unliked', likes });
}


    static async count(req: Request, res: Response) {
        const total = await LikeService.count(
            Number(req.params.postId)
        );
        res.json({ total });
    }
}
