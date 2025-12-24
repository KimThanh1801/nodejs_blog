import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Clear dữ liệu cũ (nếu cần)
  await prisma.like.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  // Hash password
  const password = await bcrypt.hash('123456', 10)

  // Tạo users
  const user1 = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin',
      role: 'ADMIN',
      password,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'Normal User',
      role: 'USER',
      password,
    },
  })

  // Tạo posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Bài viết đầu tiên',
      content: 'Nội dung bài viết đầu tiên',
      published: true,
      authorId: user1.id,
    },
  })

  const post2 = await prisma.post.create({
    data: {
      title: 'Bài viết thứ hai',
      content: 'Nội dung bài viết thứ hai',
      published: false,
      authorId: user2.id,
    },
  })

  // Tạo comments
  await prisma.comment.createMany({
    data: [
      {
        content: 'Bài viết hay quá!',
        authorId: user2.id,
        postId: post1.id,
      },
      {
        content: 'Cảm ơn bạn đã chia sẻ',
        authorId: user1.id,
        postId: post1.id,
      },
    ],
  })

  // Tạo likes
  await prisma.like.createMany({
    data: [
      {
        userId: user1.id,
        postId: post1.id,
      },
      {
        userId: user2.id,
        postId: post1.id,
      },
    ],
  })

  console.log('✅ Seed dữ liệu thành công!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })