"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Plus,Loader } from "lucide-react";

import { useForm } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";
import { title } from "process";
import { createTodoAction } from "@/prisma/serverActions";
import { useState } from "react";

export function DialogAddTodoForm({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const FormSchema = z.object({
    title: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" })
      .max(20, { message: "Must be 20 or fewer characters long" }),
    description: z
      .string()
      // .min(20, { message: "Must be 20 or more characters long" })
      // .max(50, { message: "Must be 50 or fewer characters long" })
      .optional(),
    completed: z.boolean().default(false).optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      completed: false,
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    setLoading(true)
    await createTodoAction({
      title: data.title,
      body: data.description,
      complete: data.completed,
      userId: userId,
    });
    setOpen(false)
    setLoading(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ms-auto my-2 flex" variant="outline">
          <Plus /> Add New Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>completed</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button  type="submit">Save changes{loading ? <Loader /> : ""}</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
