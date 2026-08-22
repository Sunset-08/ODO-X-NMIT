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

const loginSchema = z.object({
  loginId: z.string().min(1, "Login ID or Email is required"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{ loginId?: string; password?: string; form?: string }>({});
  
  const [formData, setFormData] = React.useState({ loginId: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    // Clear field error when typing
    if (errors[e.target.id as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [e.target.id]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate with Zod
    const result = loginSchema.safeParse(formData);
    
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
    
    // Simulate API call
    setTimeout(() => {
      // Mock validation logic
      if (formData.loginId === "admin" && formData.password === "admin") {
        setIsLoading(false);
        router.push("/admin/dashboard");
      } else if (formData.loginId && formData.password.length >= 6) {
        setIsLoading(false);
        router.push("/dashboard"); // Redirecting employees to /dashboard as requested
      } else {
        setIsLoading(false);
        setErrors({ form: "Invalid credentials. Please try again." });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="flex justify-center mb-2">
            <img src="/DF_Logo.png" alt="DayFlow Logo" className="h-12 w-auto object-contain" />
          </div>
          <CardTitle className="text-2xl font-bold">App/Web Login</CardTitle>
          <p className="text-sm text-secondary">Sign in to your DayFlow HR account</p>
        </CardHeader>
        <form onSubmit={handleSubmit} noValidate>
          <CardContent className="space-y-4">
            
            {errors.form && (
              <div className="p-3 bg-error/10 border border-error text-error text-sm text-center">
                {errors.form}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="loginId">Login Id/Email</Label>
              <Input 
                id="loginId" 
                type="text" 
                placeholder="e.g. DF20220001 or name@company.com" 
                value={formData.loginId}
                onChange={handleChange}
                error={errors.loginId}
                required 
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
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-4">
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign In
            </Button>
            <div className="text-sm text-center text-secondary">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-accent hover:underline font-medium">
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
