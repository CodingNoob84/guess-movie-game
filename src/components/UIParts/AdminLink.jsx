import Link from "next/link";
import React from "react";

function AdminLink() {
  return (
    <div className="flex justify-center items-center my-4 cursor-pointer">
      <Link
        href="/admin"
        className="w-[200px] border border-black dark:border-teal-300 shadow-xl text-center p-2 rounded-md"
      >
        Admin Dashboard
      </Link>
    </div>
  );
}

export default AdminLink;
