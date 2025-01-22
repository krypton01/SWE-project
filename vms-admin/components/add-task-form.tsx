"use client";

"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import supabase from "@/app/config/supabaseClient";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email().min(2, {
    message: "Email required",
  }),
  task: z.string({ required_error: "Password required" }).min(1),
});

export default function AddTaskForm() {
  // 1. Define your form.
  const [driverEmails, setDriverEmails] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      task: "",
    },
  });

  

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
  //   const test = values.email
  try{
    const {email, task} = values;

    
    const insertTask = await supabase
      .from('tasks_temp')
      .insert([{ user_email: email, task_descr: task, completed: false}]);

      if (insertTask.error){
        console.error('Adding task error:', insertTask.error);
        throw insertTask.error
      }
      console.log('Redirecting to dashboard...'); // Add a console log to check this line is reached
      window.location.href = '/dashboard/';
  } catch (error){
    console.error('Error inserting task:', error)
  }

  //   const res = await supabase.post({user: values.email, description: values.task})
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver Email</FormLabel>
              <FormControl>
                <Input placeholder="admin@vms.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task description</FormLabel>
              <FormControl>
                <Input placeholder="Move to Almaty" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="group">
          Add new task
          <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-all" />
        </Button>
      </form>
    </Form>
  );
}
