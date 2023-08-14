import React from "react";

function GTMovies() {
    const data = {
        date: new Date(selected),
        movieId: id,
      };
      const result = await InsertGameTable(data);
      console.log(result);
  return <div>GTMovies</div>;
}

export default GTMovies;
