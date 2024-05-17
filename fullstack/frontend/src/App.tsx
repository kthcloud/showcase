import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { FrontPage } from "./FrontPage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <FrontPage />
      </ThemeProvider>
    </>
  );
}

export default App;
