import { useState } from "react";
import "./style/NewsFeedPrompt.css";
import { Box, Button, Typography } from "@mui/material";
import PromptModal from "./PromptModal";

export default function NewsFeedPrompt() {
  const [answered, setAnswered] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAnswerClick = () => {
    setModalOpen(true);
  };

  return (
    <Box className="newsfeed-prompt">
      {answered && (
        <>
          <Typography variant="h4">Prompt of the day!</Typography>
          <Typography variant="h6">
            If you could live in a book, TV show, or movie, what would it be?
          </Typography>
        </>
      )}
      {!answered && (
        <Button variant="contained" color="primary" onClick={handleAnswerClick}>
          Answer Prompt
        </Button>
      )}
      {modalOpen && <PromptModal modalOpen setModalOpen={setModalOpen} />}
    </Box>
  );
}
