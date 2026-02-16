import { Box, Button, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React from "react";

type Props = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PromptModal({ modalOpen, setModalOpen }: Props) {
  return (
    <Box>
      PromptModal
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <Typography variant="h4">Prompt of the day!</Typography>
        <Typography variant="h6">
          If you could live in a book, TV show, or movie, what would it be?
        </Typography>
        <TextField
          id="outlined-basic"
          label="Write Your Answer Here....."
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(false)}
        >
          Submit Answer
        </Button>
      </Dialog>
    </Box>
  );
}
