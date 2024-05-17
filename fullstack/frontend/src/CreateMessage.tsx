import { Button, Stack, TextField, Typography } from "@mui/material";
import { uploadMessage } from "./api";
import { useState } from "react";

export const CreateMessage = () => {
  const [messageText, setMessageText] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    try {
      setError("");
      await uploadMessage(messageText);
      setMessageText("");
    } catch (e: unknown) {
      setError(JSON.stringify(e, null, 2));
    }
  };

  return (
    <Stack direction="column" spacing={2} alignItems="flex-start">
      <Typography variant="h4">Create a message</Typography>
      {error && (
        <Typography variant="body1" sx={{ color: "coral" }}>
          <pre>{error}</pre>
        </Typography>
      )}
      <TextField
        label="Message"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Stack>
  );
};
