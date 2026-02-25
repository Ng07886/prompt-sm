import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../api/apiClient";

interface AddFriendRequest {
  username: string;
}

export function useAddFriend() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AddFriendRequest) => {
      return apiFetch("/friends/add", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["friends", "stats"] });
    },
  });
}
