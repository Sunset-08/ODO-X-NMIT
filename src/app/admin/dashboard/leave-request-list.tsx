"use client";

import * as React from "react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { approveLeaveRequest, rejectLeaveRequest } from "@/lib/actions/leave";

type Request = {
  id: string;
  employeeName: string;
  typeName: string;
  startDate: Date;
  endDate: Date;
  totalDays: number;
};

function RequestRow({ req }: { req: Request }) {
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = React.useState<"approved" | "rejected" | null>(null);

  function handleApprove() {
    startTransition(async () => {
      await approveLeaveRequest(req.id);
      setDone("approved");
    });
  }

  function handleReject() {
    startTransition(async () => {
      await rejectLeaveRequest(req.id);
      setDone("rejected");
    });
  }

  if (done) {
    return (
      <div className="flex justify-between items-center pb-4 border-b border-border last:border-0 last:pb-0 opacity-60">
        <div>
          <p className="text-sm font-medium text-text line-through">{req.employeeName}</p>
          <p className="text-xs text-secondary">{req.typeName}</p>
        </div>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            done === "approved"
              ? "bg-success/10 text-success"
              : "bg-error/10 text-error"
          }`}
        >
          {done === "approved" ? "Approved" : "Rejected"}
        </span>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center pb-4 border-b border-border last:border-0 last:pb-0">
      <div>
        <p className="text-sm font-medium text-primary">{req.employeeName}</p>
        <p className="text-xs text-secondary">
          {req.typeName} &bull;{" "}
          {new Date(req.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          {" \u2013 "}
          {new Date(req.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          {" "}({req.totalDays}d)
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs px-2"
          onClick={handleReject}
          disabled={isPending}
        >
          {isPending ? "..." : "Reject"}
        </Button>
        <Button
          size="sm"
          className="h-7 text-xs px-2"
          onClick={handleApprove}
          disabled={isPending}
        >
          {isPending ? "..." : "Approve"}
        </Button>
      </div>
    </div>
  );
}

export function LeaveRequestList({ requests }: { requests: Request[] }) {
  if (requests.length === 0) {
    return <p className="text-sm text-secondary py-4 text-center">No pending requests.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {requests.map((req) => (
        <RequestRow key={req.id} req={req} />
      ))}
    </div>
  );
}
