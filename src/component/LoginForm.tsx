import React, { EventHandler } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useContextDispatch, useContextState } from "../context";
import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
export default function LoginForm() {
  const cookies = new Cookies();
  const { loginDialog } = useContextState();

  const [credential, setCredential] = useState({ email: "", password: "" });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };
  const handleLogin = () => {
    axios
      .post("/login", credential)
      .then((res) => {
        const token = res.data.data.token;
        const user = res.data.data.user;
        // axios.defaults.headers.Authorization = `Bearer ${token}`;
        cookies.set("token", token, { path: "/" });
        dispatch({ type: "login", userId: user._id, displayName: user.name });
        dispatch({ type: "closeLoginDialog" });
      })
      .catch(() => {
        console.log("wrong credentiral");
      });
  };
  const handleClose = () => {
    dispatch({ type: "closeLoginDialog" });
  };

  const dispatch = useContextDispatch();
  return (
    <div>
      <Dialog
        open={loginDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            onChange={handleInputChange}
            value={credential.email}
          />
          <TextField
            autoFocus
            margin="dense"
            name="password"
            label="Password"
            type="password"
            onChange={handleInputChange}
            value={credential.password}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
