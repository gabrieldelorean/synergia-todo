import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";

import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { NavigationDrawer } from "./NavigationDrawer";
import { TasksCollection } from "../db/TasksCollection";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const isLoading = useTracker(() => {
    const handler = Meteor.subscribe("tasks", {});
    if (!handler.ready()) return true;
  });

  const tasks = useTracker(() => {
    if (!Meteor.user()) {
      return { tasks: [] };
    }

    const handler = Meteor.subscribe("tasks", {});

    if (!handler.ready()) return [];

    const tasks = TasksCollection.find(
      {},
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

    return tasks;
  });

  const numTasksCadastradas = tasks.filter((task) => {
    if (task.status === "cadastrada") return true;
    return false;
  }).length;

  const numTasksEmAndamento = tasks.filter((task) => {
    if (task.status === "em-andamento") return true;
    return false;
  }).length;

  const numTasksConcluidas = tasks.filter((task) => {
    if (task.status === "concluida") return true;
    return false;
  }).length;

  const navigate = useNavigate();

  return (
    <Box className="login-form">
      <Box className="user">
        <NavigationDrawer />
      </Box>

      {isLoading && <Box className="loading">loading...</Box>}

      <Typography variant="h1" align="center" fontSize={40}>
        Olá {user.username}!!! Bem vindo ao To Do's List
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <Box
          sx={{
            width: 150,
            height: 150,
            backgroundColor: "primary.main",
            textAlign: "center",
          }}
        >
          <Typography>total de tarefas cadastradas</Typography>
          <Typography variant="h2">{numTasksCadastradas}</Typography>
        </Box>
        <Box
          sx={{
            width: 150,
            height: 150,
            backgroundColor: "primary.main",
            textAlign: "center",
          }}
        >
          <Typography>total de tarefas concluídas</Typography>
          <Typography variant="h2">{numTasksConcluidas}</Typography>
        </Box>
        <Box
          sx={{
            width: 150,
            height: 150,
            backgroundColor: "primary.main",
            textAlign: "center",
          }}
        >
          <Typography>total de tarefas em andamento</Typography>
          <Typography variant="h2">{numTasksEmAndamento}</Typography>
        </Box>
        <Box
          component="button"
          sx={{
            width: 150,
            height: 150,
            backgroundColor: "primary.main",
            textAlign: "center",
          }}
          onClick={() => navigate("/Tasks")}
        >
          <Typography>To Do's List</Typography>
        </Box>
      </Box>
    </Box>
  );
};
