import { PostsModule } from '../modules/posts/posts.module';
import { Router } from 'express';

const router = Router();

const postsController = PostsModule.controller;

router.get('/', (req, res, next) => {
  postsController.getAll(req, res).catch(next);
});

router.get('/:id', (req, res, next) => {
  postsController.getById(req, res).catch(next);
});

router.post('/', (req, res, next) => {
  postsController.create(req, res).catch(next);
});

router.put('/:id', (req, res, next) => {
  postsController.update(req, res).catch(next);
}
);

router.delete('/:id', (req, res, next) => {
  postsController.delete(req, res).catch(next);
});

export default router;