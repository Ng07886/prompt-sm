import "./style/FriendsFeed.style.css";
import { useState } from "react";
import FriendCard from "../friends/FriendCard";
import Masonry from "@mui/lab/Masonry";
import { useEffect } from "react";

type Friend = {
  id: string;
  friendName: string;
  answer: string;
};

const fakeData: Friend[] = [
  {
    id: "1",
    friendName: "Alice",
    answer: "Harry Potter — Hogwarts, magic, and cozy common rooms.",
  },
  {
    id: "2",
    friendName: "Bob",
    answer:
      "I would live in Middle-earth — not in the middle of any great wars, but in a peaceful, beautiful corner like the Shire or Ithilien. The landscapes, customs, and deep history make it a place you can wander for years and still find surprises. I love the idea of slow life, pubs with good music, and paths that lead to unexpected adventures.",
  },
  {
    id: "3",
    friendName: "Charlie",
    answer: "Star Wars — for the epic space travel and droids.",
  },
  {
    id: "4",
    friendName: "Dana",
    answer:
      "The world of Avatar — elemental bending and a strong sense of balance appeals to me.",
  },
  {
    id: "5",
    friendName: "Ethan",
    answer:
      "Narnia sounds magical. I imagine waking up to snow that melts into spring in a single day, talking creatures that become friends, and secrets behind every wardrobe. It feels like a world where wonder and danger sit side by side, which would make for endless stories.",
  },
  {
    id: "6",
    friendName: "Fiona",
    answer: "Star Trek — exploration and cooperation.",
  },
  {
    id: "7",
    friendName: "Gabe",
    answer:
      "Studio Ghibli worlds are cozy and wonder-filled; Id love that vibe.",
  },
  {
    id: "8",
    friendName: "Hana",
    answer:
      "A peaceful corner of Middle-earth like the Shire — calm and beautiful landscapes with fields, small inns, and friendly neighbors. I could spend days gardening and evenings listening to tales by the fire.",
  },
  {
    id: "9",
    friendName: "Iris",
    answer: "The Wizarding World — curious and magical.",
  },
  {
    id: "10",
    friendName: "Jack",
    answer:
      "The Pokémon world — travel, friends, and adventures with creatures sounds like fun! I'd like to visit different regions and see how cultures use Pokémon differently.",
  },
];

export default function FriendsFeed() {
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
