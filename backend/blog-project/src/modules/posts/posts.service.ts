import prisma from '../../config/database';

export class PostService {
  static create(data: {
    title: string;
    content?: string;
    image?: string;
    authorId: number;
  }) {
    return prisma.post.create({
      data,
    });
  }

  static findAll() {
    return prisma.post.findMany({
      include: {
        author: true,
        comments: true,
        likes: true,
      },
    });
  }

  static findById(id: number) {
    return prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        comments: true,
        likes: true,
      },
    });
  }

  static update(id: number, data: any) {
    return prisma.post.update({
      where: { id },
      data,
    });
  }

  static delete(id: number) {
    return prisma.post.delete({
      where: { id },
    });
  }
}