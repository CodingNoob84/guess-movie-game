import axios from "axios";

const ownbaseurl = process.env.NEXTAUTH_URL;
const TMDB_BASEURL = "https://api.themoviedb.org";
const TMDB_API_KEY = "8853c1a30ce503a21a83fa3a096a85db";

export async function getMoviesByYear(year, page) {
  try {
    if (year) {
      const response = await axios.get(
        `${TMDB_BASEURL}/3/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=ta&year=${year}&page=${page}`
      );
      return response.data;
    } else {
      return {};
    }
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
}
