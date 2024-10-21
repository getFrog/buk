import * as React from "react";

import TuringDisplay from "../components/turing-display";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Turing() {
  const exampleTM = `3
01
01B
1
3
1 0 1 1 R
1 1 1 0 R
1 B 2 B L
2 0 2 0 L
2 1 2 1 L
2 B 3 B R`;

  const exampleWord = "B00010B";

  const [inputText, setInputText] = React.useState(exampleTM);
  const [inputWord, setInputWord] = React.useState(exampleWord);
  const [numberStates, setNumberStates] = React.useState(0);
  const [sigma, setSigma] = React.useState([]);
  const [gamma, setGamma] = React.useState([]);
  const [indexStartState, setIndexStartState] = React.useState(0);
  const [indexEndState, setIndexEndState] = React.useState(0);
  const [transitions, setTransitions] = React.useState([]);
  const [stepHistory, setStepHistory] = React.useState([]);

  const [currentStateIndex, setCurrentStateIndex] = React.useState(0);
  const [currentPosition, setCurrentPosition] = React.useState(0);
  const [currentWord, setCurrentWord] = React.useState("");

  const [finished, setFinished] = React.useState(true);

  const [debug, setDebug] = React.useState(false);

  React.useEffect(() => {
    setStepHistory([]);
    
    // get the full Input seperated by newlines
    const turingInput = inputText.split(/\r?\n/);

    // insert line-based params
    setNumberStates(turingInput.at(0));
    setSigma(turingInput.at(1));
    setGamma(turingInput.at(2));
    setIndexStartState(parseInt(turingInput.at(3), 10) - 1);
    setIndexEndState(parseInt(turingInput.at(4), 10) - 1);
    setTransitions(turingInput.slice(5));

    //set current States

    setCurrentStateIndex(parseInt(turingInput.at(3), 10) - 1);
    setCurrentPosition(inputWord.split("").findIndex((item) => (item !== "B")));
    setCurrentWord(inputWord);

    setFinished(false);

  }, [inputText, inputWord]);
  
  const reset = () => {
    setStepHistory([]);
    
    setCurrentStateIndex(parseInt(inputText.at(3), 10) - 1);
    setCurrentPosition(inputWord.split("").findIndex((item) => (item !== "B")));
    setCurrentWord(inputWord);

    setFinished(false);
    
  }

  const handleNextState = () => {
    //whats the letter at the current Position?
    const letter = currentWord.at(currentPosition);

    //what state do we use?
    const state = transitions
      .find((item) => {
        return (
          parseInt(item.split(" ").at(0), 10) - 1 === currentStateIndex &&
          item.split(" ").at(1) === letter
        );
      })
      .split(" ");

    //apply State
    const index = parseInt(state.at(2), 10) - 1;
    setCurrentStateIndex(index);
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

    // are we done?
    index === indexEndState ? setFinished(true) : setFinished(false);
  };

  React.useEffect(() => {
    // write Step history
    stepHistory.push(
      currentWord.substring(0, currentPosition) +
        "[" +
        currentStateIndex +
        "]" +
        currentWord.substring(currentPosition)
    );
  }, [currentPosition]);

  return (
    <>
      <Paper sx={{ padding: 5 }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              sx={{ width: "100%", m: 0.5 }}
              id="outlined-multiline-static"
              label="TM Eingabe"
              multiline
              rows={8}
              defaultValue={exampleTM}
              onChange={(event) => {
                setInputText(event.target.value);
              }}
            />
            <TextField
              sx={{ marginTop: 3, width: "100%" }}
              id="outlined-multiline-static"
              label="Wort"
              defaultValue={exampleWord}
              onChange={(event) => {
                setInputWord(event.target.value);
              }}
            />
          </Grid>
          <Grid size={6}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  sx={{ width: "100%", m: 0.5 }}
                  label="Ausgabe"
                  multiline
                  rows={9}
                  value={stepHistory.join("\n")}
                  editable={false}
                /></Grid>
                <Grid size={6}>
                  <Button
                    sx={{ width: "100%", m: 0.5 }}
                    variant={"contained"}
                    disabled={finished}
                    onClick={handleNextState}
                  >
                    Step ➡
                  </Button>
                </Grid>
                <Grid size={6}>
                  <Button
                    sx={{ width: "100%", m: 0.5 }}
                    variant={"contained"}
                    onClick={reset}
                  >
                    Zurücksetzen
                  </Button>
                
              </Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            {" "}
            <TuringDisplay
              word={currentWord}
              currentStateIndex={currentStateIndex}
              currentPosition={currentPosition}
              isFinished={finished}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
