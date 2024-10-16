import * as React from "react";
import { animated } from "react-spring";
import { useWiggle } from "../hooks/wiggle";
import { Link } from "wouter";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Turing() {
  return (
    <>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline

        />
      </Box>
    </>
  );
}
