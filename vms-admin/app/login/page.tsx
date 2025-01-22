import LoginForm from "@/components/login-form";
import supabase from "../config/supabaseClient"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";




export default function LoginPage() {
  console.log(supabase)
  return (
    <main className="flex h-screen justify-center items-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
