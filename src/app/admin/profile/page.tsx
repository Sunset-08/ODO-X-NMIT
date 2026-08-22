"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminOwnProfilePage() {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <Card>
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start relative">
          <div className="flex flex-col items-center gap-4 min-w-[200px]">
            <Avatar initials="AD" className="w-24 h-24 text-2xl" />
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-primary">Admin User</h2>
              
              <div className="flex flex-col gap-3 mt-2">
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Email</span>
                  {isEditing ? (
                    <Input defaultValue="admin@odo.com" className="h-7 text-sm" />
                  ) : (
                    <span className="text-primary border-b border-border pb-1">admin@odo.com</span>
                  )}
                </div>
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Role</span>
                  <span className="text-primary border-b border-border pb-1">HR Administrator</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full flex justify-end gap-2 mt-4 md:mt-0 md:absolute md:top-8 md:right-8">
            {isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button size="sm" onClick={() => setIsEditing(false)}>Save</Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
