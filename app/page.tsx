import { DialogAddTodoForm } from "@/components/DialogDemo";
import NavBar from "@/components/NavBar";
import TodoTabel from "@/components/todoTabel";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <>
      <div className="translate-y-20">
        <NavBar />
        <div className="w-3/4 mx-auto my-10">
          <DialogAddTodoForm userId={userId as string} />
          <TodoTabel />
        </div>
      </div>
    </>
  );
}
