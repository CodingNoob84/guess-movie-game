import React from "react";

function EmptyButton() {
  return (
    <button className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs border-black dark:border-white">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black dark:bg-white"></span>
    </button>
  );
}

export default EmptyButton;
