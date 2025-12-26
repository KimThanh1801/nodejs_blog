import { CommentModule } from "../modules/comments/comments.module";
import { Router } from "express";

const router = Router()

const commentCotroller  = CommentModule.controller;

router.post('/comments', commentCotroller.create);
router.get('/posts/:postId/comments', commentCotroller.getByPost);

export default router;