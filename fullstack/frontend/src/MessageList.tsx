import { Button, Chip, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchMessages } from "./api";

export const MessageList = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const load = async () => {
    try {
      const messageList = await fetchMessages();
      setMessages(messageList);
    } catch (e: unknown) {
      setError(JSON.stringify(e, null, 2));
    }
  };
  
  useEffect(() => {
    load();
  }, []);

  if (error) {
    <Typography variant="body1" sx={{ color: "coral" }}>
      <pre>{error}</pre>
    </Typography>;
  }
  return (
    <Stack direction="column" spacing={2}>
      <Button variant="contained" color="primary" onClick={load}>
        Load messages
      </Button>

      {messages.map((message, index) => (
        <Chip key={index} label={message} />
      ))}
    </Stack>
  );
};
