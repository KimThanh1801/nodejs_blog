import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // 👉 Xóa dữ liệu cũ (tránh lỗi quan hệ)
    await prisma.like.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    // 👉 Tạo users
    const users = await prisma.user.createMany({
        data: [
            {
                name: 'Alice',
                password: 'password123',
                role: "admin",
                email: 'alice@test.com'
            },
            {
                name: 'Bob',
                password: 'password123',
                role: "user",   
                email: 'bob@test.com'
            },
            {
                name: 'Charlie',
                password: 'password123',
                role: "user",
                email: 'charlie@test.com'
            }
        ]
    });

    const allUsers = await prisma.user.findMany();

    // 👉 Tạo posts
    const posts = await prisma.post.createMany({
        data: [
            {
                title: 'Post 1',
                content: 'Hello from Alice',
                published: true,
                image: 'https://picsum.photos/600/400?random=1',
                emoji: '🔥',
                authorId: allUsers[0].id
            },
            {
                title: 'Post 2',
                content: 'Bob is here',
                published: true,
                image: 'https://picsum.photos/600/400?random=1',
                emoji: '🚀',
                authorId: allUsers[1].id
            },
            {
                title: 'Post 3',
                content: 'Charlie posting',
                published: true,
                image: 'https://picsum.photos/600/400?random=1',
                emoji: '🎉',
                authorId: allUsers[2].id
            }
        ]
    });

    const allPosts = await prisma.post.findMany();

    // 👉 Tạo comments
    await prisma.comment.createMany({
        data: [
            {
                content: 'Nice post!',
                authorId: allUsers[1].id,
                postId: allPosts[0].id
            },
            {
                content: 'Great!',
                authorId: allUsers[2].id,
                postId: allPosts[1].id
            },
            {
                content: 'Awesome!',
                authorId: allUsers[0].id,
                postId: allPosts[2].id
            }
        ]
    });

    // 👉 Tạo likes
    await prisma.like.createMany({
        data: [
            {
                userId: allUsers[0].id,
                postId: allPosts[1].id
            },
            {
                userId: allUsers[1].id,
                postId: allPosts[2].id
            },
            {
                userId: allUsers[2].id,
                postId: allPosts[0].id
            }
        ]
    });

    console.log('✅ Seed data created successfully');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
