import prisma from '../../config/database';

export const PostService = {
  createPost: async (authorId: number, title: string, content?: string) => {
    return prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
  },

  getAllPosts: async () => {
    return prisma.post.findMany({
      include: {
        author: true,
        comments: true,
        likes: true,
      },
    });
  },

  getPostById: async (id: number) => {
    return prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        comments: {
          include: { author: true },
        },
        likes: true,
      },
    });
  },

  updatePost: async (
    id: number,
    data: { title?: string; content?: string; published?: boolean }
  ) => {
    return prisma.post.update({
      where: { id },
      data,
    });
  },

  deletePost: async (id: number) => {
    return prisma.post.delete({
      where: { id },
    });
  },
};
