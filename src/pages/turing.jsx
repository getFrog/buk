import * as React from "react";
import { TuringDisplay } from "../components/turing-display/";

export default function Turing() {
  const [turingInput, setTuringInput] = React.useState([]);
  const [numberStates, setNumberStates] = React.useState(0);
  const [sigma, setSigma] = React.useState([]);
  const [gamma, setGamma] = React.useState([]);
  const [indexStartState, setIndexStartState] = React.useState(0);
  const [indexEndState, setIndexEndState] = React.useState(0);
  const [transitions, setTransitions] = React.useState([]);
  const [wordInput, setWordInput] = React.useState("");

  const [currentStateIndex, setCurrentStateIndex] = React.useState(0);
  const [currentState, setCurrentState] = React.useState([]);
  const [currentPosition, setCurrentPosition] = React.useState(0);
  const [currentWord, setCurrentWord] = React.useState("");

  const [finished, setFinished] = React.useState(false);

  const handleTextInput = () => {
    // get the full Input seperated by newlines
    setTuringInput(document.getElementById("input-text").value.split(/\r?\n/));

    // insert line-based params
    setNumberStates(turingInput.at(0));
    setSigma(turingInput.at(1));
    setGamma(turingInput.at(2));
    setIndexStartState(parseInt(turingInput.at(3), 10) - 1);
    setIndexEndState(parseInt(turingInput.at(4), 10) - 1);
    setTransitions(turingInput.slice(5));

    // read the word
    setWordInput(document.getElementById("input-word").value);

    //set current States

    setCurrentStateIndex(indexStartState);
    setCurrentPosition(1);
    setCurrentWord(wordInput);
    setCurrentState([]);
  };

  const handleNextState = () => {
    setCurrentState(
      transitions.filter((item) => {
        return parseInt(item.split(" ").at(0), 10) - 1 === currentStateIndex;
      })
    );

    //whats the letter at the current Position?
    const letter = currentWord.at(currentPosition);

    //what state do we use?
    const state = currentState
      .find((item) => item.split(" ").at(1) === letter)
      .split(" ");

    //apply State
    setCurrentStateIndex(parseInt(state.at(2), 10) - 1);
    setCurrentWord(
      currentWord.substring(0, currentPosition) +
        state.at(3) +
        currentWord.substring(currentPosition + 1)
    );

    switch (state.at(4)) {
      case "L":
        setCurrentPosition(currentPosition - 1);
        break;
      case "R":
        setCurrentPosition(currentPosition + 1);
        break;
    }

    //are we done?
    currentStateIndex === indexEndState
      ? setFinished(true)
      : setFinished(false);
  };

  return (
    <>
      <label> TM-Eingabe </label>
      <textarea id="input-text" name="TM-Eingabe">{`3
01
01B
1
3
1 0 1 1 R
1 1 1 0 R
1 B 2 B L
2 0 2 0 L
2 1 2 1 L
2 B 3 B R`}</textarea>{" "}
      <br />
      <label>Wort</label>
      <input id="input-word" name="Wort"></input> <br />
      <button onClick={handleTextInput}> TM einspielen</button>
      <button onClick={handleNextState} disabled={finished}>
        {" "}
        {"->"}{" "}
      </button>
      <br />
      <div>
        transitions:
        <br />
        {transitions.map((item) => (
          <>
            {item} <br />
          </>
        ))}
      </div>
      <div>
        currentState:
        <br />
        {currentState.map((item) => (
          <>
            {item} <br />
          </>
        ))}
      </div>
      <div>currentStateIndex: {currentStateIndex}</div>
      <div>currentPosition: {currentPosition}</div>
      <div>currentWord: {currentWord}</div>
      <div>endIndex: {indexEndState} </div>
      <div>finished: {finished.toString()}</div>
      <TuringDisplay
     //   word={currentWord}
       // currentStateIndex={currentStateIndex}
     //   currentPosition={currentPosition}
      //  isFinished={finished}
      />
      
      <br />
      <h3></h3>
    </>
  );
}
