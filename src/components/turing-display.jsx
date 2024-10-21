import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

export default function TuringDisplay({
  word,
  currentStateIndex,
  currentPosition,
  isFinished,
}) {
  return (
    <>
      <Box
        sx={{
          justifyContent: "space-between",
          marginTop: 2,
          width: "100%",
          overflowX: "auto",
            flexWrap: "nowrap",
          button: {
            flex: "none",
          },
        }}
      >
        <TuringCell letter={"..."} isCurrent={false} />

        {word.split("").map((item, index) => {
          return (
            <TuringCell letter={item} isCurrent={index === currentPosition} />
          );
        })}

        <TuringCell letter={"..."} isCurrent={false} />
      </Box>
  
    </>
  );
}

function TuringCell({ letter, isCurrent }) {
  return (
    <>
      <Button
        sx={{  maxWidth: "100%", m: 0.5 }}
        variant={isCurrent ? "contained" : "outlined"}
      >
        {letter}
      </Button>
    </>
  );
}
