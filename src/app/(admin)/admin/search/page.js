import SearchMoviesByYear from "@/components/admin/SearchMoviesByYear";
import React from "react";

export default function SearchPage() {
  return (
    <main className="h-screen w-screen">
      <div className="w-full h-full flex flex-col">
        <div className="h-[50px]">Nav Bar</div>
        <div className="flex-1 overflow-y-auto">
          <SearchMoviesByYear />
        </div>
        <div className="h-[50px]">Footer</div>
      </div>
    </main>
  );
}
