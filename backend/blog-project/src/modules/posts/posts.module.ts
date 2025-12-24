import { PostController } from "./posts.controller";
import { PostService } from "./posts.service";

const PostsModule =  {
  controller: PostController,
  service: PostService,
}

export default PostsModule;