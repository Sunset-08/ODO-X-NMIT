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
  email: z.string().email("Invalid admin email address"),
  password: z.string().min(6, "Password is required"),
});

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{ email?: string; password?: string; form?: string }>({});
  const [formData, setFormData] = React.useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    if (errors[e.target.id as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [e.target.id]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = loginSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      // Mock validation
      if (formData.email === "admin@odo.com" && formData.password === "admin123") {
        setIsLoading(false);
        router.push("/admin/dashboard");
      } else {
        setIsLoading(false);
        setErrors({ form: "Invalid admin credentials." });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2 pb-4">
          <CardTitle className="text-2xl font-bold">Admin Sign In</CardTitle>
          <p className="text-sm text-secondary">Authorized access only</p>
        </CardHeader>
        <form onSubmit={handleSubmit} noValidate>
          <CardContent className="space-y-4">
            {errors.form && (
              <div className="p-3 bg-error/10 border border-error text-error text-sm text-center">
                {errors.form}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" required>Admin Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@odo.com" 
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
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
              <Link href="/login" className="text-accent hover:underline font-medium">
                Return to Employee Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
