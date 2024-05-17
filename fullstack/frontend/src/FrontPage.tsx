import {
  AppBar,
  Box,
  Container,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { CreateMessage } from "./CreateMessage";
import { MessageList } from "./MessageList";

export const FrontPage = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <img src="icon.png" style={{ height: "3rem" }} />

            <Link
              href="#"
              sx={{ textDecoration: "none", color: "inherit", mx: 3 }}
            >
              <Typography
                variant="h6"
                sx={{
                  flexGrow: 1,
                }}
              >
                fullstack showcase
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ p: 5 }}>
        <CreateMessage />
        <MessageList />
      </Container>
    </>
  );
};
