import { PrismaClient } from '@prisma/client/extension';
import bcrypt from 'bcryptjs';
import { CreateUserDto } from './users.module';

const prisma = new PrismaClient();

export const userService = {
  create: async (data: CreateUserDto) => {
    // Mã hóa password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Tạo user mới trong database
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    // Trả về user (có thể loại bỏ password trước khi return)
    const { password, ...result } = user;
    return result;
  },

  findAll: async () => {
    return prisma.user.findMany({
      select: { id: true, name: true, email: true }
    });
  },

  findById: async (id: number) => {
    return prisma.user.findUnique({ where: { id } });
  },
};
