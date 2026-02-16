import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import NewsFeedPrompt from "./NewsFeedPrompt";
import FriendsFeed from "./FriendsFeed";

export default function NewsfeedContainer() {
  const { user, getIdToken, loading } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchToken() {
      if (!user) return setToken(null);
      const t = await getIdToken();
      if (mounted) setToken(t);
    }
    fetchToken();
    return () => {
      mounted = false;
    };
  }, [user, getIdToken]);

  if (loading) return <div>Loading auth...</div>;

  return (
    <div>
      {user ? (
        <div>
          <NewsFeedPrompt />
          <hr></hr>
          <FriendsFeed />
        </div>
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  );
}
