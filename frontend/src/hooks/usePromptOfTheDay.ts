import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../api/apiClient";
import { useAuthUser } from "./useAuthUser";

interface PromptOfTheDayResponse {
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  question: string;
}

export function usePromptOfTheDay(date?: string) {
  const user = useAuthUser();
  const queryDate = date;
  console.log("usePromptOfTheDay called with date:", queryDate);
  const qs = queryDate ? `?date=${encodeURIComponent(queryDate)}` : "";

  return useQuery<PromptOfTheDayResponse>({
    queryKey: ["prompt", queryDate ?? null],
    queryFn: () => apiFetch(`/prompts/today${qs}`),
    enabled: !!user,
  });
}
