import { useState } from "react";
import "./style/NewsFeedPrompt.css";
import { Box, Button, Typography } from "@mui/material";
import PromptModal from "./PromptModal";
import { usePromptOfTheDay } from "@/hooks/usePromptOfTheDay";
import { getISODate } from "@/utils/date";

export default function NewsFeedPrompt() {
  const [answered] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: prompt } = usePromptOfTheDay(getISODate());

  const handleAnswerClick = () => {
    setModalOpen(true);
  };

  return (
    <Box className="newsfeed-prompt">
      {answered && (
        <>
          <Typography variant="h4">Prompt of the day!</Typography>
          <Typography variant="h6">
            {prompt ? prompt.question : "Loading prompt..."}
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
