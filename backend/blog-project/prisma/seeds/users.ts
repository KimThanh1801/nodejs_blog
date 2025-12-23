// prisma/seeds/users.ts

import extension = require("@prisma/client/extension");

const prisma = new extension.PrismaClient(); // tạo client

async function main() {
  console.log("Seeding users...");

  const users = [
    { email: "alice@example.com", name: "Alice", password: "123456" },
    { email: "bob@example.com", name: "Bob", password: "abcdef" },
    { email: "charlie@example.com", name: "Charlie", password: "password" },
  ];

  for (const userData of users) {
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    });
  }

  console.log("Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1); // NodeJS đã có sẵn, không cần import
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
