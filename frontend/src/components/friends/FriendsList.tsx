import Masonry from "@mui/lab/Masonry";
import { useEffect, useState } from "react";
import FriendCard from "./FriendCard";
import { useFriendsWithStats } from "@/hooks/useFriendsWithStats";

type Friend = {
  id: number;
  friendName: string;
  streak: string;
  numAnswered: number;
};

// We keep a small local view-model type for FriendCard.
type FriendVm = Friend;

export default function FriendsList() {
  const { data, isLoading, isError, error } = useFriendsWithStats();

  const [selected, setSelected] = useState<Friend | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const friends: FriendVm[] = Array.isArray(data)
    ? (data as unknown[]).map((f, idx) => {
        const rec = (
          typeof f === "object" && f !== null
            ? (f as Record<string, unknown>)
            : {}
        ) as Record<string, unknown>;

        return {
          id: idx,
          friendName:
            (rec.username as string | undefined) ??
            (rec.displayName as string | undefined) ??
            (rec.friendName as string | undefined) ??
            "Friend",
          streak: String(
            (rec.streak as string | number | undefined) ??
              (rec.currentStreak as string | number | undefined) ??
              "0d",
          ),
          numAnswered: Number(
            (rec.numAnswered as number | undefined) ??
              (rec.answeredCount as number | undefined) ??
              0,
          ),
        };
      })
    : [];

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
      {isLoading && <div>Loading friends...</div>}
      {isError && (
        <div style={{ color: "crimson" }}>
          {(error as Error)?.message ?? "Failed to load friends"}
        </div>
      )}
      <Masonry columns={3} spacing={2}>
        {friends.map((f) => (
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
            <FriendCard
              friendName={f.friendName}
              footer={
                <div className="friend-stats">
                  <span className="streak">{f.streak}</span>
                  <span className="count">{f.numAnswered} answers</span>
                </div>
              }
            />
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
            <FriendCard
              friendName={selected.friendName}
              footer={
                <div className="friend-stats">
                  <span className="streak">{selected.streak}</span>
                  <span className="count">{selected.numAnswered} answers</span>
                </div>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
