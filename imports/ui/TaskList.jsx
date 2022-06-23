import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Checkbox,
  Fab,
  FormControlLabel,
  FormGroup,
  List,
  TextField,
} from "@mui/material";
import { Add, NavigateBefore, NavigateNext } from "@mui/icons-material";

import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { TasksCollection } from "../db/TasksCollection";
import { Task } from "./Tasks";
import { NavigationDrawer } from "./NavigationDrawer";

const deleteTask = ({ _id }) => Meteor.call("tasks.remove", _id);

const changeStatus = ({ _id }, status) =>
  Meteor.call("tasks.changeStatus", _id, status);

export const TaskList = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const [filter, setFilter] = useState({ status: { $ne: "concluida" } });

  const [skip, setSkip] = useState(0);

  const checkboxFilter = () => {
    if (hideCompleted) setFilter({ status: { $ne: "concluida" } });
    else setFilter({});

    setHideCompleted(!hideCompleted);
  };

  const searchFilter = (pesquisa) => {
    if (pesquisa) {
      setFilter({ name: { $regex: pesquisa, $options: "i" } });
      setHideCompleted(false);
    } else {
      setFilter({ status: { $ne: "concluida" } });
      setHideCompleted(false);
    }
  };

  const { tasks, isLoading } = useTracker(() => {
    if (!Meteor.user()) {
      return { tasks: [] };
    }

    const handler = Meteor.subscribe("tasks", filter, 4, skip);

    if (!handler.ready()) return { tasks: [], isLoading: true };

    const tasks = TasksCollection.find(
      {},
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

    return { tasks };
  });

  const navigate = useNavigate();

  return (
    <Box className="main">
      <Box className="user">
        <NavigationDrawer />
      </Box>

      <Box>
        <FormGroup onChange={checkboxFilter}>
          <FormControlLabel
            control={<Checkbox checked={hideCompleted} />}
            label="Mostrar Concluídas"
          />
        </FormGroup>
      </Box>
      <TextField
        label="pesquise sua tarefa aqui"
        onChange={(e) => searchFilter(e.target.value)}
      />

      {isLoading && <Box className="loading">loading...</Box>}

      <List className="tasks" sx={{ bgcolor: "background.paper" }}>
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onDeleteClick={deleteTask}
            onChangeStatus={changeStatus}
          />
        ))}
      </List>

      <Box>
        <Fab
          sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 10 }}
          color="primary"
          aria-label="add"
          onClick={() => navigate("/CreateTask")}
        >
          <Add />
        </Fab>
      </Box>
      <Box className="navigation">
        <Fab
          disabled={skip === 0}
          color="primary"
          onClick={() => setSkip(skip - 4)}
        >
          <NavigateBefore />
        </Fab>
        <Fab
          disabled={skip >= tasks.length - 3}
          color="primary"
          onClick={() => setSkip(skip + 4)}
        >
          <NavigateNext />
        </Fab>
      </Box>
    </Box>
  );
};
