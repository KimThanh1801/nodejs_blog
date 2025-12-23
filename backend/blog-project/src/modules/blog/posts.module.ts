import * as postController from './posts.controller.js';
import * as postService from './posts.service.js';
import { CreatePostDto } from './dto/posts.dto.js';

const PostModule = {
  controller: postController,
  service: postService,
};

export { CreatePostDto };
export default PostModule;
