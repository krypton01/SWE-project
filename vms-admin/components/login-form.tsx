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
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email().min(2, {
    message: "Email required",
  }),
  password: z.string({ required_error: "Password required" }),
});

export default function LoginForm() {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State to track error message
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;

    if ((email === "beka@god.com" && password === "bekasupermacy") || (email === "assyl@admin.com" && password === "admin123")) {
      window.location.href = '/dashboard/';
    } else {
      setErrorMessage("Invalid email or password"); // Set error message if credentials don't match
    }
  }

  const toggleShowPassword = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent event from propagating to form submission
    setShow(!show);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="admin@vms.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="flex gap-1">
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    type={show ? "text" : "password"}
                  />
                </FormControl>
                <Button size="icon" onClick={toggleShowPassword}>
                  {show ? (
                    <EyeOffIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <Button type="submit" className="group">
          Login{" "}
          <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-all" />
        </Button>
      </form>
    </Form>
  );
}
