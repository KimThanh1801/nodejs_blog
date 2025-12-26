import prisma from '../../config/database';

export class CommentService {
  static create(data: {
    content: string;
    authorId: number;
    postId: number;
  }) {
    return prisma.comment.create({ data });
  }

  static findByPost(postId: number) {
    return prisma.comment.findMany({
      where: { postId },
      include: { author: true },
    });
  }

  static update(id: number, content: string) {
    return prisma.comment.update({
      where: { id },
      data: { content },
    });
  }

  static delete(id: number) {
    return prisma.comment.delete({
      where: { id },
    });
  }
}
