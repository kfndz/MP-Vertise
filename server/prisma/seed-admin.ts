import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Defina ADMIN_SEED_EMAIL e ADMIN_SEED_PASSWORD no .env antes de rodar o seed-admin.",
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.admin.upsert({
    where: { email },
    update: {
      name: "Administrador",
      passwordHash,
    },
    create: {
      name: "Administrador",
      email,
      passwordHash,
    },
  });

  console.log("Admin criado/atualizado com sucesso.");
  console.log(`Email: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });