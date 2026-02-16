import Masonry from "@mui/lab/Masonry";
import { useEffect, useState } from "react";
import FriendCard from "./FriendCard";

type Friend = {
  id: number;
  friendName: string;
  streak: string;
  numAnswered: number;
};

// Fake data matching the Friend type
const fakeData: Friend[] = [
  { id: 1, friendName: "Alice", streak: "7d", numAnswered: 42 },
  { id: 2, friendName: "Ben", streak: "3d", numAnswered: 12 },
  { id: 3, friendName: "Carla", streak: "14d", numAnswered: 88 },
  { id: 4, friendName: "Diego", streak: "1d", numAnswered: 2 },
  { id: 5, friendName: "Elena", streak: "21d", numAnswered: 150 },
  { id: 6, friendName: "Faisal", streak: "5d", numAnswered: 30 },
  { id: 7, friendName: "Grace", streak: "12d", numAnswered: 64 },
  { id: 8, friendName: "Hiro", streak: "0d", numAnswered: 0 },
  { id: 9, friendName: "Ivy", streak: "9d", numAnswered: 27 },
  { id: 10, friendName: "Jon", streak: "2d", numAnswered: 7 },
];

export default function FriendsList() {
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
      <Masonry columns={3} spacing={2}>
        {fakeData.map((f) => (
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
