import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../api/apiClient";

/**
 * Matches backend `POST /users/register`.
 * Backend derives `uid` from the Firebase token and accepts optional profile fields.
 */
export interface RegisterUserRequest {
  displayName?: string;
  photoURL?: string;
}

export function useRegisterUser() {
  return useMutation({
    mutationFn: async (data: RegisterUserRequest) => {
      return apiFetch("/users/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
  });
}
