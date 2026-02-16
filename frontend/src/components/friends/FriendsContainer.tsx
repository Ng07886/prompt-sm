import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect, useState } from "react";
import AddFriendSection from "./AddFriendSection";
import FriendsList from "./FriendsList";

export default function FriendsContainer() {
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
