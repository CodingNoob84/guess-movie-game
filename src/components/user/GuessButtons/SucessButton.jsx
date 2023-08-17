import React from "react";

function SucessButton() {
  return (
    <button className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs border-black dark:border-white">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-white"
        >
          <path d="M20 6L9 17L4 12" />
        </svg>
      </span>
    </button>
  );
}

export default SucessButton;
