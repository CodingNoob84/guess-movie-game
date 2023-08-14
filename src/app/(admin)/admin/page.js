import MoviesList from "@/components/admin/MoviesPaginationByYear";
import SearchMoviesByYear from "@/components/admin/SearchMoviesByYear";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="border border-black p-2 flex flex-col justify-center items-center">
        <Link href="/admin/search">Search Movies</Link>
        <Link href="/admin/selectedmovies">Selected Movies</Link>
        <Link href="/admin/setmovies">Set Movies</Link>
        <Link href="/admin/search">Scoreboard</Link>
      </div>
    </div>
  );
}
