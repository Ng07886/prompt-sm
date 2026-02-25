import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useAddFriend } from "@/hooks/useAddFriend";

export default function AddFriendSection() {
  const [username, setUsername] = useState("");
  const addFriend = useAddFriend();

  const onAdd = async () => {
    const trimmed = username.trim();
    if (!trimmed) return;
    await addFriend.mutateAsync({ username: trimmed });
    setUsername("");
  };

  return (
    <Box>
      <TextField
        id="outlined-basic"
        label="Friend's Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onAdd}
        disabled={addFriend.isPending || !username.trim()}
      >
        Add
      </Button>
      {addFriend.isError && (
        <div style={{ color: "crimson" }}>
          {(addFriend.error as Error)?.message ?? "Failed to add friend"}
        </div>
      )}
    </Box>
  );
}
