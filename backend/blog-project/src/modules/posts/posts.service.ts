import prisma from '../../config/database.js';
import {CreatePostDto, UpdatePostDto } from './dto/index.js'

export class PostService {
  
  // Tạo bài viết mới
  async createPost(data: CreatePostDto) {
    try {
      const post = await prisma.post.create({
        data: {
          title: data.title,
          content: data.content,
          authorId: data.authorId,
        },
      });
      return post;
    } catch (error: any) {
      throw new Error(`Error creating post: ${error.message}`);
    }
  }

  // Cập nhật bài viết
  async updatePost(postId: number, data: UpdatePostDto) {
    try {
      const post = await prisma.post.update({
        where: { id: postId },
        data: data,
      });
      return post;
    } catch (error: any) {
      throw new Error(`Error updating post: ${error.message}`);
    }
  }

  // Xóa bài viết
  async deletePost(postId: number) {
    try {
      const post = await prisma.post.delete({
        where: { id: postId },
      });
      return post;
    } catch (error: any) {
      throw new Error(`Error deleting post: ${error.message}`);
    }
  }

  // Lấy tất cả bài viết
  async getAllPosts() {
    try {
      const posts = await prisma.post.findMany({
        include: {
          author: true, // Bao gồm thông tin tác giả khi lấy bài viết
        },
      });
      return posts;
    } catch (error: any) {
      throw new Error(`Error fetching posts: ${error.message}`);
    }
  }

  // Lấy bài viết theo ID
  async getPostById(postId: number) {
    try {
      const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
          author: true, // Bao gồm thông tin tác giả khi lấy bài viết
        },
      });
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    } catch (error: any) {
      throw new Error(`Error fetching post: ${error.message}`);
    }
  }
}