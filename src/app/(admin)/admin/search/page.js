import AdminLink from "@/components/UIParts/AdminLink";
import SearchMovies from "@/components/admin/SearchMovies";
import React from "react";

export default function SearchPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <AdminLink />

      <SearchMovies />
    </div>
  );
}
