"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { ImageUpload } from "@/components/ui/image-upload";

const signupSchema = z.object({
  companyName: z.string().min(2, "Company Name is required"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [formData, setFormData] = React.useState({
    companyName: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    if (errors[e.target.id]) {
      setErrors((prev) => ({ ...prev, [e.target.id]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = signupSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 py-12">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="space-y-4 pb-6">
            <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
            <p className="text-sm text-secondary">
              We&apos;ve sent a verification link to <span className="font-medium text-primary">{formData.email}</span>. 
              Please verify your email to continue.
            </p>
          </CardHeader>
          <CardContent>
            <Link href="/login">
              <Button className="w-full">Return to Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="flex justify-center mb-2">
            <img src="/DF_Logo.png" alt="DayFlow Logo" className="h-12 w-auto object-contain" />
          </div>
          <CardTitle className="text-2xl font-bold">App/Web Sign Up</CardTitle>
          <p className="text-sm text-secondary">Register a new company account</p>
        </CardHeader>
        <form onSubmit={handleSubmit} noValidate>
          <CardContent className="space-y-4">
            
            <div className="mb-4">
              <ImageUpload />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName" required>Company Name</Label>
              <Input 
                id="companyName" 
                value={formData.companyName}
                onChange={handleChange}
                error={errors.companyName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" required>Name</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" required>Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" required>Phone</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" required>Password</Label>
              <PasswordInput 
                id="password" 
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <p className="text-[10px] text-secondary">Must be at least 8 characters</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" required>Confirm Password</Label>
              <PasswordInput 
                id="confirmPassword" 
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-4">
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign Up
            </Button>
            <div className="text-sm text-center text-secondary">
              Already have an account?{" "}
              <Link href="/login" className="text-accent hover:underline font-medium">
                Sign In
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
