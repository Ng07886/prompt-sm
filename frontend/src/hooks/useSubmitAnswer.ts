import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../api/apiClient";

interface SubmitAnswerRequest {
  promptId: string;
  answer: string;
  displayName?: string;
  photoURL?: string;
  username?: string;
}

export function useSubmitAnswer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: SubmitAnswerRequest) => {
      return apiFetch("/answers/submit", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompt"] });
      queryClient.invalidateQueries({ queryKey: ["newsfeed"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
