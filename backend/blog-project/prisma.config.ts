import "dotenv/config";            // load biến môi trường từ .env
import { defineConfig } from 'prisma/config';


export default defineConfig({
  schema: "prisma/schema.prisma", // đường dẫn tới schema Prisma
  migrations: {
    path: "prisma/migrations",    // nơi lưu migration
  },
  datasource: {
    url: process.env.DATABASE_URL, // lấy URL database từ .env
  },
});
