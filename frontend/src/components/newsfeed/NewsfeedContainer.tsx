import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import NewsFeedPrompt from "./NewsFeedPrompt";
import FriendsFeed from "./FriendsFeed";
import { useMe } from "@/hooks/useMe";
import { getISODate } from "@/utils/date";
import PromptModal from "./PromptModal";
import { useState } from "react";
import { Button } from "@mui/material";

export default function NewsfeedContainer() {
  const { user, getIdToken, loading } = useAuth();
  const [forcePromptOpen, setForcePromptOpen] = useState(false);
  const { data: me, isLoading: meLoading } = useMe();
  const today = getISODate();

  const hasAnsweredToday = me?.lastAnsweredPromptDate === today;

  useEffect(() => {
    async function fetchToken() {
      if (!user) return;
      await getIdToken();
    }
    fetchToken();
  }, [user, getIdToken]);

  if (loading) return <div>Loading auth...</div>;

  return (
    <div>
      {user ? (
        <div>
          <NewsFeedPrompt />
          <hr></hr>
          {meLoading ? (
            <div>Loading profile...</div>
          ) : hasAnsweredToday ? (
            <FriendsFeed />
          ) : (
            <div>
              <p>
                You need to answer today’s prompt before you can see your
                friends’ answers.
              </p>
              <Button
                variant="contained"
                onClick={() => setForcePromptOpen(true)}
              >
                Answer now
              </Button>
              <PromptModal
                modalOpen={forcePromptOpen}
                setModalOpen={setForcePromptOpen}
              />
            </div>
          )}
        </div>
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  );
}
