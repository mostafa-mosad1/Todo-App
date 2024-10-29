"use server";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getTodoAction({userId}:{userId:string | null}) {
    revalidatePath("/");
   
  return await prisma.todo.findMany({
    orderBy:{
      createAt:"desc"
    } ,where:{
      userId
   }
  });
}
export async function createTodoAction({
  title,
  body,
  userId,
  complete,
}: {
  title: string;
  body?: string;
  userId?: string;
  complete?: boolean;
}) {
  revalidatePath("/");

  return await prisma.todo.create({
   
    data: {
      title,
      body,
      userId,
      complete,
    },
  });
}
export async function updataUserTodoAction({
    id,
    title,
    body,
    userId,
    complete,
  }: {
    id: string;
    title: string;
    body?: string;
    userId?: string;
    complete?: boolean;
  }) {
    revalidatePath("/");
  
    return await prisma.todo.update({
     where:{
        id
     },
      data: {
        title,
        body,
        userId,
        complete,
      },
    });
  }
export async function deleteTodoAction(id:string) {
    revalidatePath("/");
    return await prisma.todo.delete({
        where:{
            id
        }
    })
}
