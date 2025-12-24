import { Router } from 'express';
import PostsModule from '../modules/posts/posts.module.js';

const router = Router();

const postsController = new PostsModule.controller.PostController();

router.get('/', (req, res, next) => {
  postsController.getAllPosts(req, res).catch(next);
});

router.get('/:id', (req, res, next) => {
  postsController.getPostById(req, res).catch(next);
});

router.post('/', (req, res, next) => {
  postsController.createPost(req, res).catch(next);
});

router.put('/:id', (req, res, next) => {
  postsController.updatePost(req, res).catch(next);
}
);

router.delete('/:id', (req, res, next) => {
  postsController.deletePost(req, res).catch(next);
});

export default router;