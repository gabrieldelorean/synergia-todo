import { Box, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { NavigationDrawer } from "./NavigationDrawer";

export const CreateTask = () => {
  const navigate = useNavigate();
  const user = useTracker(() => Meteor.user());

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState(new Date());

  const newTask = ({ name, author, description, date }) =>
    Meteor.call("tasks.insert", { name, author, description, date });

  const submit = (e) => {
    e.preventDefault();
    newTask({
      name,
      description,
      author: user.username,
      date: new Date(date),
    });

    navigate(-1);
  };

  return (
    <Box component="form" className="login-form" onSubmit={submit}>
      <Box className="user">
        <NavigationDrawer />
      </Box>
      <Typography gutterBottom variant="h1" align="center" fontSize={30}>
        Criar Uma Nova Tarefa
      </Typography>
      <Box>
        <TextField
          label="task name"
          variant="outlined"
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
      </Box>
      <Box>
        <TextField
          label="task description"
          variant="outlined"
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>

      <Box>
        <TextField
          label="task date"
          type="date"
          name="date"
          defaultValue={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          sx={{ width: 230 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <Button
          sx={{ bgcolor: "red" }}
          color="error"
          variant="contained"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Create
        </Button>
      </Box>
    </Box>
  );
};
