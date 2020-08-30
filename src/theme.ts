import { createMuiTheme } from "@material-ui/core/styles";
import { red, indigo } from "@material-ui/core/colors";
import { PlayCircleFilledWhite } from "@material-ui/icons";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[100],
    },
    secondary: {
      main: "#19857b",
    },
    background: {
      default: "#fff",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        margin: "8px",
      },
    },
  },
});

export default theme;
