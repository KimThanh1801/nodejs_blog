import prisma from '../../config/database';

export class LikeService {
  static async like(userId: number | undefined, postId: number) {
    const uid = userId ?? 1;

    const existingLike = await prisma.like.findFirst({
      where: { userId: uid, postId },
    });
    if (existingLike) return existingLike;

    return prisma.like.create({
      data: {
        user: { connect: { id: uid } }, // Connect user
        post: { connect: { id: postId } }, // Connect post
      },
    });
  }

  static unlike(userId: number | undefined, postId: number) {
    const uid = userId ?? 1;
    return prisma.like.deleteMany({
      where: { userId: uid, postId },
    });
  }

  static count(postId: number) {
    return prisma.like.count({
      where: { postId },
    });
  }
}
