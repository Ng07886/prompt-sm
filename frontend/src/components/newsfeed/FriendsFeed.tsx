import "./style/FriendsFeed.style.css";
import { useState } from "react";
import FriendCard from "../friends/FriendCard";
import Masonry from "@mui/lab/Masonry";
import { useEffect } from "react";
import { useNewsfeedFeed } from "@/hooks/useNewsfeed";
import { getISODate } from "@/utils/date";

type Friend = {
  id: string;
  friendName: string;
  answer: string;
};

export default function FriendsFeed() {
  const today = getISODate();
  const { data, isLoading, isError, error } = useNewsfeedFeed({
    pageSize: 30,
    date: today,
  });

  const items: Friend[] = Array.isArray(data?.data)
    ? (data!.data as unknown[]).map((item, idx) => {
        const rec =
          typeof item === "object" && item !== null
            ? (item as Record<string, unknown>)
            : ({} as Record<string, unknown>);

        // Best-effort mapping (we can tighten once we confirm backend shape).
        const id = (rec.id as string | undefined) ?? String(idx);
        // Backend currently returns answer docs keyed by uid.
        // We don't have displayName joined yet, so show uid for now.
        const friendName =
          (rec.displayName as string | undefined) ??
          (rec.username as string | undefined) ??
          (rec.userId as string | undefined) ??
          "Friend";
        const answer =
          (rec.answer as string | undefined) ??
          (rec.response as string | undefined) ??
          "";

        return { id, friendName, answer };
      })
    : [];

  const [selected, setSelected] = useState<Friend | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  // Close with an animation: set isClosing to true, wait for animation, then clear selection
  const handleClose = () => {
    setIsClosing(true);
    window.setTimeout(() => {
      setSelected(null);
      setIsClosing(false);
    }, 280); // match CSS transition duration
  };

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div className="friends-feed">
      {isLoading && <div>Loading feed...</div>}
      {isError && (
        <div style={{ color: "crimson" }}>
          {(error as Error)?.message ?? "Failed to load feed"}
        </div>
      )}
      <Masonry columns={3} spacing={2}>
        {items.map((f) => (
          <div
            key={f.id}
            role="button"
            tabIndex={0}
            onClick={() => {
              setSelected(f);
              setIsClosing(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelected(f);
                setIsClosing(false);
              }
            }}
          >
            <FriendCard friendName={f.friendName}>
              <div className="friend-answer-body">{f.answer}</div>
            </FriendCard>
          </div>
        ))}
      </Masonry>

      {selected && (
        <div
          className={`friend-overlay ${isClosing ? "exit" : "open"}`}
          role="dialog"
          aria-modal="true"
          onClick={() => handleClose()}
        >
          <div
            className="friend-overlay-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="friend-overlay-close"
              aria-label="Close"
              onClick={() => handleClose()}
            >
              X
            </button>
            <FriendCard friendName={selected.friendName}>
              <div className="friend-answer-body">{selected.answer}</div>
            </FriendCard>
          </div>
        </div>
      )}
    </div>
  );
}
