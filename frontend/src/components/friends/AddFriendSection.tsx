import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React from "react";

export default function AddFriendSection() {
  return (
    <Box>
      <TextField
        id="outlined-basic"
        label="Friend's Username"
        variant="outlined"
      />
      <Button variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
}
