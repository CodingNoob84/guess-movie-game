import AdminLink from "@/components/UIParts/AdminLink";
import SelectedMovies from "@/components/admin/SelectedMovies";
import React from "react";

export default function SelectedMoviesPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <AdminLink />
      <SelectedMovies />
    </div>
  );
}
