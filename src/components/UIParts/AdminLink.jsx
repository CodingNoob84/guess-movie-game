import Link from "next/link";
import React from "react";

function AdminLink() {
  return (
    <div className="flex justify-center items-center my-2 cursor-pointer">
      <Link href="/admin" className="w-[200px] border bg-slate-300 text-center">
        Admin Dashboard
      </Link>
    </div>
  );
}

export default AdminLink;
