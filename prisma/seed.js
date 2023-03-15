import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@gmail.com',
      password: await bcrypt.hash('123456', 10),
      role: 'ADMIN',
    },
  })

  console.log('Seeding finished.')
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
