import Head from "next/head";
import Document from "next/document";
import React, { useEffect, useState } from "react";
import getConfig from "next/config";
import Button from "@material-ui/core/Button";
import App, { Container } from "next/app";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import makeStyles from "@material-ui/core/styles/makeStyles";
import theme from "../../src/theme";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useContextDispatch } from "../../src/context";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const useStyles = makeStyles({
  root: {
    padding: theme.spacing(2),
  },
});
function Manage() {
  const classes = useStyles();
  const [fund, setFund] = useState({ totalAmount: 0, balance: 0 });

  const [topUpAmount, setTopUpAmount] = useState(0);
  const dispatch = useContextDispatch();
  useEffect(() => {
    getMyFund();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTopUpAmount(value);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getMyFund = () => {
    axios.get("/myfund").then((res) => {
      if (res.data) {
        const fund = res.data.data;
        setFund({ balance: fund.amount, totalAmount: fund.initialAmount });
      }
    });
  };
  const handleAddAmount = () => {
    axios.post("/fund", { amount: topUpAmount }).then(() => {
      dispatch({ type: "showSnackbar", successMessage: "Successfully Added" });
      getMyFund();
      handleClose();
    });
  };
  return (
    <React.Fragment>
      <Container maxWidth="xs">
        <Paper>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem divider>
              <ListItemIcon>
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText primary="Balance" />
              <Typography> ${fund.balance.toFixed(2)}</Typography>

              <Button variant="contained" onClick={handleClickOpen}>
                Add
              </Button>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary="Initial Amount" />
              <Typography> ${fund.totalAmount.toFixed(2)}</Typography>
            </ListItem>
          </List>
        </Paper>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Top Up Amount</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            onChange={handleInputChange}
            value={topUpAmount}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddAmount} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Manage;
