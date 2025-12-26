import prisma from '../../config/database';

export class PostService {
  // Chỉnh sửa phương thức create để hỗ trợ emoji và published
  static create(data: {
    title: string;
    content?: string;
    emoji: string;
    image?: string;
    authorId: number;
    published?: boolean;
  }) {
    return prisma.post.create({
      data: {
        ...data,
        published: data.published ?? false,  // Nếu không có thì mặc định là false
      },
    });
  }

  // Lấy tất cả bài viết, bao gồm tác giả, comment và like
  static findAll() {
    return prisma.post.findMany({
      include: {
        author: true,
        comments: true,
        likes: true,
      },
    });
  }

  // Lấy một bài viết theo id, bao gồm thông tin tác giả, comment và like
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

  // Cập nhật bài viết, bổ sung emoji và published
  static update(id: number, data: { 
    title?: string; 
    content?: string; 
    emoji?: string; 
    image?: string; 
    published?: boolean;
  }) {
    return prisma.post.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(), // Cập nhật thời gian
      },
    });
  }

  // Xóa bài viết theo id
  static delete(id: number) {
    return prisma.post.delete({
      where: { id },
    });
  }
}