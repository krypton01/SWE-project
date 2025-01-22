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
import { ArrowRightIcon, EyeIcon, EyeOffIcon, Link } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createClient } from '@supabase/supabase-js';
import supabase from "@/app/config/supabaseClient";




const formSchema = z
  .object({
    email: z.string().email().min(2, {
      message: "Email required",
    }),
    name: z.string().min(1),
    surname: z.string().min(1),
    phone: z.string().min(10),
    address: z.string().min(1),
    job_type: z.string().min(1),
    password: z.string({ required_error: "Password required" }),
    password_confirm: z.string({
      required_error: "Confirming password required",
    }),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords don't match",
    path: ["password_confirm"],
  });

export default function AddDriverForm() {
  const [show, setShow] = useState(false);
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      surname: "",
      phone:"",
      address:"",
      job_type:"",
      password: "",
      password_confirm: "",
    },
  });
  


  // 2. Define a submit handler.
  // Modified submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { email, password, name, surname, phone, address, job_type } = values;
  
      // Sign up user with Supabase Auth
      const signUpResponse = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (signUpResponse.error) {
        console.error('Sign-up error:', signUpResponse.error);
        throw signUpResponse.error;
      }
  
      // Insert data into 'employees' table
      const insertResponse = await supabase
        .from('employees')
        .insert([{ user_email: email, phone: phone, address: address, job_type: job_type, Name: name, Surname: surname, password: password}]);
  
      if (insertResponse.error) {
        console.error('Data insertion error:', insertResponse.error);
        throw insertResponse.error;
      }
  
      console.log('Employee added successfully:', insertResponse.data);
      console.log('Redirecting to dashboard...'); // Add a console log to check this line is reached
      window.location.href = '/dashboard/';
    } catch (error) {
      console.error('Error during sign-up or data insertion:', error);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="eg. Assyl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Second Name</FormLabel>
              <FormControl>
                <Input placeholder="eg. Rakhmashev" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input placeholder="eg. +77776665544" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="eg. Astana, Turan avenue, 44" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
  control={form.control}
  name="job_type"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Job Type</FormLabel>
      <FormControl>
        <Input placeholder="eg. Driver.." {...field} />
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
        <FormField
          control={form.control}
          name="password_confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
        
        <Button type="submit" 
        className="group">
          Add new employee
          <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-all" />
        </Button>
      </form>
    </Form>
  );
}
