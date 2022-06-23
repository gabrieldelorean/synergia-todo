import React from "react";
import { useNavigate } from "react-router-dom";
import { Delete, Assignment, Edit } from "@mui/icons-material";
import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Box } from "@mui/system";

export const Task = ({ task, onDeleteClick, onChangeStatus }) => {
  const navigate = useNavigate();
  return (
    <ListItem
      className={task.status === "cadastrada" ? "" : `${task.status}`}
      disablePadding
    >
      <Box>
        <ListItemIcon>
          <Assignment sx={{ color: "yellow" }} />
        </ListItemIcon>
        <ListItemText
          primary={`${task.name}`}
          secondary={`autor: ${
            task.author
          } | prazo: ${task.date.toLocaleDateString()}`}
        />
      </Box>
      <Box>
        <ListItemButton>
          <Button
            variant="contained"
            sx={{ fontSize: 10 }}
            color="primary"
            onClick={() => onChangeStatus(task, "cadastrada")}
          >
            cadastrada
          </Button>
        </ListItemButton>
        <ListItemButton>
          <Button
            disabled={task.status !== "cadastrada"}
            variant={task.status === "em-andamento" ? "outlined" : "contained"}
            sx={{ fontSize: 10 }}
            color="warning"
            onClick={() => onChangeStatus(task, "em-andamento")}
          >
            em andamento
          </Button>
        </ListItemButton>
        <ListItemButton>
          <Button
            disabled={task.status !== "em-andamento"}
            variant={task.status === "concluida" ? "outlined" : "contained"}
            sx={{ fontSize: 10 }}
            color="success"
            onClick={() => onChangeStatus(task, "concluida")}
          >
            concluida
          </Button>
        </ListItemButton>
      </Box>
      <Box>
        <ListItemIcon>
          <ListItemButton
            edg="end"
            onClick={() => navigate("/EditTask", { state: { task } })}
          >
            <Edit />
          </ListItemButton>
        </ListItemIcon>
        <ListItemIcon>
          <ListItemButton edge="end" onClick={() => onDeleteClick(task)}>
            <Delete sx={{ color: "red" }} />
          </ListItemButton>
        </ListItemIcon>
      </Box>
    </ListItem>
  );
};
