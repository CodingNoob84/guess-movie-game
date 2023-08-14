"use client";
import AdminLink from "@/components/UIParts/AdminLink";
import SetMovies from "@/components/admin/SetMovies";
import { format } from "date-fns";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function SetMoviePage() {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <AdminLink />
      <SetMovies />
    </div>
  );
}

export default SetMoviePage;
