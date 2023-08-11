import AdminLink from "@/components/UIParts/AdminLink";
import SearchMoviesByYear from "@/components/admin/SearchMoviesByYear";
import React from "react";

export default function SearchPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <AdminLink />
      <SearchMoviesByYear />
    </div>
  );
}
