import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/api/apiClient";
import { useAuthUser } from "./useAuthUser";

export interface NewsfeedItem {
  id: string;
  userId?: string;
  promptId?: string;
  question?: string;
  answer?: string;
  createdAt?: unknown;
  [key: string]: unknown;
}

export interface NewsfeedFeedResponse {
  data: NewsfeedItem[];
}

export interface UseNewsfeedFeedArgs {
  pageSize?: number;
  /** millis timestamp (number or numeric string) */
  before?: number | string;
  /** Calendar date (YYYY-MM-DD). Backend returns answers for that prompt/date. */
  date?: string;
}

export function useNewsfeedFeed(args: UseNewsfeedFeedArgs = {}) {
  const user = useAuthUser();
  const qs = new URLSearchParams();
  if (args.pageSize) qs.set("pageSize", String(args.pageSize));
  if (args.before !== undefined) qs.set("before", String(args.before));
  if (args.date) qs.set("date", String(args.date));

  const path = `/newsfeed/feed${qs.toString() ? `?${qs.toString()}` : ""}`;

  return useQuery<NewsfeedFeedResponse>({
    queryKey: [
      "newsfeed",
      "feed",
      args.pageSize ?? null,
      args.before ?? null,
      args.date ?? null,
    ],
    queryFn: () => apiFetch(path),
    enabled: !!user,
  });
}
