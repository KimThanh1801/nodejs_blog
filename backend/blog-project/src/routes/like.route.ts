import { LikeModule } from '../modules/likes/likes.module';
import { Router } from 'express';

const router = Router();

const likeController = LikeModule.controller; 

router.post('/posts/:postId/like', likeController.like);
router.delete('/posts/:postId/like', likeController.unlike);

export default router;