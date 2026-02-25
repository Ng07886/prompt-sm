import { Box, Button, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React from "react";
import { useState } from "react";
import { useSubmitAnswer } from "@/hooks/useSubmitAnswer";
import { usePromptOfTheDay } from "@/hooks/usePromptOfTheDay";
import { useAuth } from "@/contexts/AuthContext";
import { getISODate } from "@/utils/date";

type Props = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PromptModal({ modalOpen, setModalOpen }: Props) {
  const [answer, setAnswer] = useState("");
  const submitAnswer = useSubmitAnswer();
  const promptDate = getISODate();
  const { data: prompt } = usePromptOfTheDay(promptDate);
  const { user } = useAuth();

  const onSubmit = async () => {
    const trimmed = answer.trim();
    if (!trimmed) return;
    await submitAnswer.mutateAsync({
      // For now promptId is the prompt doc id, which is the date.
      promptId: promptDate,
      answer: trimmed,
      displayName: user?.displayName ?? undefined,
      photoURL: user?.photoURL ?? undefined,
      username: user?.email ?? undefined,
    });
    setAnswer("");
    setModalOpen(false);
  };

  return (
    <Box>
      PromptModal
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <Typography variant="h4">Prompt of the day!</Typography>
        <Typography variant="h6">
          {prompt?.question ?? "Loading prompt..."}
        </Typography>
        <TextField
          id="outlined-basic"
          label="Write Your Answer Here....."
          variant="outlined"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={
            submitAnswer.isPending || !answer.trim() || !prompt?.question
          }
        >
          Submit Answer
        </Button>
        {submitAnswer.isError && (
          <div style={{ color: "crimson" }}>
            {(submitAnswer.error as Error)?.message ??
              "Failed to submit answer"}
          </div>
        )}
      </Dialog>
    </Box>
  );
}
