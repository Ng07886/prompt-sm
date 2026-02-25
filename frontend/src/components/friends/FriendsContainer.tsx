import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import AddFriendSection from "./AddFriendSection";
import FriendsList from "./FriendsList";

export default function FriendsContainer() {
  const { user, getIdToken, loading } = useAuth();

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
          <AddFriendSection />
          <hr></hr>
          <FriendsList />
        </div>
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  );
}
