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
    email : z.string().email().min(2, {
        message: "Required",
    }),
    reg_num: z.string().min(2, {
      message: "Required",
    }),
    brand: z.string({ required_error: "Brand of vehicle required" }).min(1),
    model: z.string({ required_error: "Model of vehicle required" }).min(1),
    type: z.string({ required_error: "Please indicate type of vehicle" }),
  })

export default function AddCarForm() {
  const [show, setShow] = useState(false);
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email:"",
      reg_num: "",
      brand: "",
      model: "",
      type: "",
    },
  });
  


  // 2. Define a submit handler.
  // Modified submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { reg_num, brand, model, type, email } = values;
  
      
  
      
      // Insert data into 'cars' table
      const insertResponse = await supabase
        .from('vehicles')
        .insert([{ user_email: email, plate: reg_num, brand: brand, model: model, type: type}]);
  
      if (insertResponse.error) {
        console.error('Data insertion error:', insertResponse.error);
        throw insertResponse.error;
      }
  
      console.log('Car added successfully:', insertResponse.data);
      console.log('Redirecting to dashboard...'); // Add a console log to check this line is reached
      window.location.href = '/dashboard/';
    } catch (error) {
      console.error('Error during data insertion:', error);
    }
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
                <Input placeholder="To whom vehicle will be assigned" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reg_num"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration number</FormLabel>
              <FormControl>
                <Input placeholder="KZ896LBA06" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand of the vehicle</FormLabel>
              <FormControl>
                <Input placeholder="eg. Nissan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model of the vehicle</FormLabel>
              <FormControl>
                <Input placeholder="eg. Terrano" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <div className="flex gap-1">
                <FormControl>
                  <Input
                    placeholder="eg. Car, Truck, Bus... may be Hellicopter..."
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        
        <Button type="submit" 
        className="group">
          Add new vehicle
          <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-all" />
        </Button>
      </form>
    </Form>
  );
}
