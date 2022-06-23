import { Box, TextField, Button, Typography } from "@mui/material";
import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
    navigate("/App");
  };

  return (
    <Box component="form" onSubmit={submit} className="login-form">
      <Typography variant="h1" align="center" fontSize={30} gutterBottom>
        Bem Vindo ao To Do's List
      </Typography>

      <Box>
        <TextField
          label="username"
          variant="outlined"
          type="text"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </Box>

      <Box>
        <TextField
          label="password"
          type="password"
          name="password"
          variant="outlined"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Box>
        <Button type="submit" variant="contained">
          Log In
        </Button>
      </Box>
      <Link to="/CreateAccount">Create Accounte !!</Link>
    </Box>
  );
};
