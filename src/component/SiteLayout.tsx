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

import theme from "../theme";
import { StyledLink } from "./StyledLink";

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

  const { mounted } = useContextState();

  return <div>{<MenuBar children={children} />}</div>;
};

const MenuBar = ({ children }) => {
  const dispatch = useContextDispatch();
  const { loggedIn, displayName } = useContextState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <Box flexGrow={1}>
              <Button variant="text">MyFund</Button>
            </Box>
          </Link>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <div className={classes.content}>{children}</div>
      </Container>
    </div>
  );
};

export default SiteLayout;
