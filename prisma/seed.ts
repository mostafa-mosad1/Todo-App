import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
 return await prisma.todo.create({
    data:{
        title:"lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
        body:"body body body body body body body body body body body body body body body body body body body body body body body ", 
    }
  })
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })