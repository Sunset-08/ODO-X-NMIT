"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2 pb-4">
          <CardTitle className="text-2xl font-bold">App/Web Sign Up</CardTitle>
          <p className="text-sm text-secondary">Register a new company account</p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            
            <div className="flex flex-col items-center justify-center gap-2 mb-4">
              <div className="w-20 h-20 rounded-full border border-dashed border-border flex items-center justify-center bg-surface text-secondary cursor-pointer hover:bg-background transition-colors">
                <span className="text-xl">↑</span>
              </div>
              <span className="text-xs text-secondary font-medium">Upload Logo</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName" required>Company Name</Label>
              <Input id="companyName" type="text" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" required>Name</Label>
              <Input id="name" type="text" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" required>Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" required>Phone</Label>
              <Input id="phone" type="tel" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" required>Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" required>Confirm Password</Label>
              <Input id="confirmPassword" type="password" required />
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
