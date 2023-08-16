import React from "react";
import SucessButton from "./GuessButtons/SucessButton";
import EmptyButton from "./GuessButtons/EmptyButton";
import FailureButton from "./GuessButtons/FailureButton";

function DisplayGuesses({ noOfGuesses, isGuessed }) {
  console.log("isGuesed", isGuessed);
  console.log("no of guesses", noOfGuesses);
  if (isGuessed) {
    if (noOfGuesses === 1) {
      return (
        <div className="flex flex-row justify-center items-center gap-2">
          <SucessButton />
          <EmptyButton />
          <EmptyButton />
        </div>
      );
    } else if (noOfGuesses === 2) {
      return (
        <div className="flex flex-row justify-center items-center gap-2">
          <FailureButton />
          <SucessButton />
          <EmptyButton />
        </div>
      );
    } else if (noOfGuesses === 3) {
      return (
        <div className="flex flex-row justify-center items-center gap-2">
          <FailureButton />
          <FailureButton />
          <SucessButton />
        </div>
      );
    }
  } else if (!isGuessed) {
    if (noOfGuesses === 1) {
      return (
        <div className="flex flex-row justify-center items-center gap-2">
          <FailureButton />
          <EmptyButton />
          <EmptyButton />
        </div>
      );
    } else if (noOfGuesses === 2) {
      return (
        <div className="flex flex-row justify-center items-center gap-2">
          <FailureButton />
          <FailureButton />
          <EmptyButton />
        </div>
      );
    } else if (noOfGuesses === 3) {
      return (
        <div className="flex flex-row justify-center items-center gap-2">
          <FailureButton />
          <FailureButton />
          <FailureButton />
        </div>
      );
    }
  }

  // Default case
  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <EmptyButton />
      <EmptyButton />
      <EmptyButton />
    </div>
  );
}

export default DisplayGuesses;
