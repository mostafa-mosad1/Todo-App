import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ISendTodo } from "@/interface";

import { Eye,X } from "lucide-react";
import { Badge } from "./ui/badge";

function PopDetailsTodo({ id, title, body, complete, userId }: ISendTodo) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Eye />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader >
            <AlertDialogTitle className="text-3xl" >{title}</AlertDialogTitle>
            <AlertDialogDescription>
             <div> 
                <p className="text-xl">
                {body} 
                </p>
                <p className="flex justify-end pt-4" >
                {complete ? (
                <Badge className="opacity-60">Completed</Badge>
              ) : (
                <Badge>UnCompleted</Badge>
              )}
                </p>
                

             </div> 
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="absolute top-4 right-4 bg-red-500 hover:bg-red-600  " > <X /></AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default PopDetailsTodo;
