import prisma from '../../config/database';

export class PostService {
  static create(data: {
    title?: string;
    content?: string;
    image?: string;
    authorId: number;
  }) {
    return prisma.post.create({
      data: {
        title: data.title ?? 'Bài viết mới',
        content: data.content,
        image: data.image,
        authorId: data.authorId,
      },
    });
  }

  static findAll() {
    return prisma.post.findMany({
      include: {
        author: true,
        comments: true,
        likes: true,
      },
      orderBy: {
        createdAt: 'desc',
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

  static update(
    id: number,
    data: {
      title?: string;
      content?: string;
      image?: string | null;
    }
  ) {
    return prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        image: data.image,
      },
    });
  }

  static async delete(id: number) {
    await prisma.comment.deleteMany({
      where: { postId: id },
    });

    await prisma.like.deleteMany({
      where: { postId: id },
    });

    return prisma.post.delete({
      where: { id },
    });
  }

}
