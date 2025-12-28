import { LikeModule } from '../modules/likes/likes.module';
import { Router } from 'express';

const router = Router();

const likeController = LikeModule.controller;

router.post('/:postId/like', likeController.like);
router.delete('/:postId/like', likeController.unlike);

export default router;