import * as React from "react";
//import GridLayout from "react-grid-layout";

export default function TuringDisplay(
 // word,
//  currentStateIndex,
 // currentPosition,
 // isFinished
) {
  return <>hello</>;
}

function TuringCell(letter, isCurrent) {
  return (
    <>
      <h1 color={isCurrent ? "green" : "black"}>{letter}</h1>
    </>
  );
}
