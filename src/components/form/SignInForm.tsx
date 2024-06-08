"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required").min(8, "Password must have at least 8 characters"),
});

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      toast({
        title: "Error signing in",
        description: "Oops! Something went wrong. Please try again.",
        variant: "destructive",
      });
    } else {
      router.refresh();
      router.push("/app");
    }

    console.log(signInData);
  };

  return (
    <div className="border-2 border-gray-300 p-10 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
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
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormDescription>
            <Link href="/forgot-password" className="font-semibold text-blue-500">
              Forgot Password?
            </Link>
          </FormDescription>
          <FormDescription>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="font-semibold text-blue-500">
              Sign Up
            </Link>
          </FormDescription>
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white">
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
