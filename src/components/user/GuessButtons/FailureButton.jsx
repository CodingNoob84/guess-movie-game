import React from "react";

function FailureButton() {
  return (
    <button className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs border-black dark:border-white">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-white"
        >
          <line x1="12" y1="3" x2="3" y2="12" />
          <line x1="3" y1="3" x2="12" y2="12" />
        </svg>
      </span>
    </button>
  );
}

export default FailureButton;
