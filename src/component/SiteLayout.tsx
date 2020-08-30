import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useContextDispatch, useContextState } from "../context";
import Link from "next/link";
import { Box, Container, Avatar, Fab, Menu, MenuItem } from "@material-ui/core";
import Cookies from "universal-cookie";
import theme from "../theme";
import { StyledLink } from "./StyledLink";
import LoginForm from "./LoginForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#ffffff",
  },
  content: {
    marginTop: theme.spacing(8),
    justifyContent: "center",
  },
}));

const SiteLayout = ({ children }) => {
  const dispatch = useContextDispatch();

  const { loggedIn } = useContextState();

  return <div>{<MenuBar children={children} loggedIn={loggedIn} />}</div>;
};

const MenuBar = ({ children, loggedIn }) => {
  const cookies = new Cookies();
  const dispatch = useContextDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const classes = useStyles();

  const handleLogout = () => {
    cookies.remove("token", { path: "/" });
    dispatch({ type: "logout" });
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <Box flexGrow={1}>
              <Button variant="text">MyFund</Button>
            </Box>
          </Link>
          {loggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                dispatch({ type: "openLoginDialog" });
              }}
            >
              Login
            </Button>
          )}

          <LoginForm />
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <div className={classes.content}>{children}</div>
      </Container>
    </div>
  );
};

export default SiteLayout;
