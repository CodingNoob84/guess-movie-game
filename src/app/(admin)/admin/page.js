import MoviesList from "@/components/admin/MoviesPaginationByYear";
import SearchMoviesByYear from "@/components/admin/SearchMoviesByYear";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="border border-black dark:border-teal-400 p-2 flex flex-col justify-center items-center gap-2">
        <Link
          href="/admin/search"
          className="border border-black dark:border-teal-500 p-2 w-48 text-center"
        >
          Search Movies
        </Link>
        <Link
          href="/admin/selectedmovies"
          className="border border-black dark:border-teal-500 p-2 w-48 text-center"
        >
          Selected Movies
        </Link>
        <Link
          href="/admin/setmovies"
          className="border border-black dark:border-teal-500 p-2 w-48 text-center"
        >
          Set Movies
        </Link>
        <Link
          href="/admin/scoreboard"
          className="border border-black dark:border-teal-500 p-2 w-48 text-center"
        >
          Scoreboard
        </Link>
      </div>
    </div>
  );
}
