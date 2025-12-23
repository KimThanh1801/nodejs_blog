import * as postService from './posts.service.js';
import { CreatePostDto } from './dto/posts.dto.js';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dto = Object.assign(new CreatePostDto(), req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    const newPost = await postService.create(dto);
    res.status(201).json({ message: 'Tạo bài viết thành công', data: newPost });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPosts = await postService.getAll();
    res.status(200).json(allPosts);
  } catch (error) {
    next(error);
  }
};
