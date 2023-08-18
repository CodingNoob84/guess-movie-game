import AdminLink from "@/components/UIParts/AdminLink";
import ScoreBoard from "@/components/admin/ScoreBoard";
import React from "react";

export default function ScoreBoardPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <AdminLink />

      <ScoreBoard />
    </div>
  );
}
