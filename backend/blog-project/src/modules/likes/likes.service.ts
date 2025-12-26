import prisma from '../../config/database';

export class LikeService {
  static like(userId: number, postId: number) {
    return prisma.like.create({
      data: { userId, postId },
    });
  }

  static unlike(userId: number, postId: number) {
    return prisma.like.deleteMany({
      where: { userId, postId },
    });
  }

  static count(postId: number) {
    return prisma.like.count({
      where: { postId },
    });
  }
}
