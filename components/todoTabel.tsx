import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTodoAction } from "@/prisma/serverActions";
import { Badge } from "./ui/badge";
import ButtonActions from "./ButtonActions";
import { auth } from '@clerk/nextjs/server'

export default async function TodoTabel() {
  const { userId }= await auth()
  const allTodos = await getTodoAction({userId});
console.log(userId,"yalla")
  return (
    <Table>
      <TableCaption>A list of your recent Todos.</TableCaption>
      <TableHeader>
        <TableRow className="text-2xl">
          <TableHead className="w-[100px] flex items-center justify-center">
            Id
          </TableHead>
          <TableHead >Title</TableHead>
          <TableHead className="text-start">Completed</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allTodos?.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell className="font-medium">{todo.id}</TableCell>
            <TableCell>
              {todo.title}
            </TableCell>
            <TableCell>
              {todo.complete ? (
                <Badge className="opacity-60">Completed</Badge>
              ) : (
                <Badge>UnCompleted</Badge>
              )}
            </TableCell>
            <TableCell className=" flex items-end justify-end space-x-2 text-right">
              <ButtonActions
                id={todo.id}
                title={todo.title}
                body={todo.body as string}
                complete={todo.complete as boolean}
                userId={todo.userId as string}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{allTodos.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
