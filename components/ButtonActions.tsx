"use client";
import { Loader, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { deleteTodoAction } from "@/prisma/serverActions";
import { DialogEditForm } from "./DialogEditForm";
import { ISendTodo } from "@/interface";
import PopDetailsTodo from "./popDetailsTodo";

function ButtonActions({ id, title, body, complete, userId }: ISendTodo) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <DialogEditForm
        id={id}
        title={title}
        body={body as string}
        complete={complete as boolean}
        userId={userId as string}
      />
      <Button
        onClick={async () => {
          setLoading(true);
          await deleteTodoAction(id);
          setLoading(false);
        }}
        variant={"destructive"}
        size={"sm"}
      >
        {loading ? <Loader /> : <Trash size={16} />}
      </Button>
      <PopDetailsTodo
        id={id}
        title={title}
        body={body as string}
        complete={complete as boolean}
        userId={userId as string}
      />
    </>
  );
}

export default ButtonActions;
