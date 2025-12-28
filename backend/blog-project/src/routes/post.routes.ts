import { CommentController } from "../modules/comments/comment.controller";
import { PostsModule } from '../modules/posts/posts.module';
import { Router } from 'express';
import multer from 'multer';


const router = Router();
const upload = multer({ dest: 'uploads/' });

const postsController = PostsModule.controller;

router.get('/', (req, res, next) => {
  postsController.getAll(req, res).catch(next);
});

router.get('/:id', (req, res, next) => {
  postsController.getById(req, res).catch(next);
});

router.post('/', upload.single('image'), (req, res, next) => {
  postsController.create(req, res).catch(next);
});

router.put('/:id', upload.single('image'), (req, res, next) => {
  postsController.update(req, res).catch(next);
});

router.delete('/:id', (req, res, next) => {
  postsController.delete(req, res).catch(next);
});
router.post("/:postId/comments", CommentController.create);
router.get("/:postId/comments", CommentController.getByPost);

export default router;