import axios from "axios";

const BASE_URL = process.env.NEXTAUTH_URL;
const TMDB_BASEURL = "https://api.themoviedb.org";
const TMDB_API_KEY = "8853c1a30ce503a21a83fa3a096a85db";

export async function getMoviesByQuery(query, page) {
  try {
    if (query) {
      const response = await axios.get(
        `${TMDB_BASEURL}/3/search/movie?query=${query}&api_key=${TMDB_API_KEY}&page=${page}`
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

export async function getCastByTmdbId(tmdbId) {
  try {
    if (tmdbId) {
      const response = await axios.get(
        `${TMDB_BASEURL}/3/movie/${tmdbId}/credits?api_key=${TMDB_API_KEY}`
      );
      return response.data.cast;
    } else {
      return {};
    }
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
}

export async function insertMovies(data) {
  try {
    const response = await axios.post(`/api/movies`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
}

export async function getSelectedMovies() {
  try {
    const response = await axios.get(`/api/movies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
}

export async function getUpdatedArtistsById(movieId) {
  try {
    if (movieId) {
      //console.log(movieId);
      const response = await axios.get(`/api/artists/${movieId}`);
      //console.log(response.data);
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
}

export async function insertArtists(data) {
  try {
    const response = await axios.post(`/api/artists`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
}

export async function MoviesAutoComplete(query) {
  try {
    if (query) {
      const response = await axios.get(
        `/api/movies/autocomplete?query=${query}`
      );
      console.log(response.data);
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
}

export async function InsertGameTable(data) {
  try {
    const response = await axios.post(`/api/movies/daily`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
}

export async function getMovieByDate(date) {
  try {
    if (date) {
      const response = await axios.get(
        `/api/movies/daily?datequery=${new Date(date)}`
      );
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
}

export async function InsertScore(data) {
  try {
    const response = await axios.post(`/api/scorecard`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
}

export async function getUserScoreByDate(userId, date) {
  try {
    if (date) {
      const response = await axios.get(
        `/api/scorecard/${userId}?datequery=${new Date(date)}`
      );
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
}
