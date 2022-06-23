import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  Divider,
  Button,
  ListItem,
  ListItemText,
  Fab,
  ListItemAvatar,
  Avatar,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { Assignment, Dashboard, Logout, Person } from "@mui/icons-material";

import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";

export const NavigationDrawer = () => {
  const user = useTracker(() => Meteor.user());
  const [state, setState] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    Meteor.logout();
    navigate("/");
  };

  return (
    <>
      <Button
        color="primary"
        aria-label="navigation-drawer"
        onClick={() => setState(true)}
      >
        <Avatar
          alt="profile photo"
          src={!!user.profile.avatar ? user.profile.avatar : ""}
        >
          {user.username[0].toUpperCase()}
        </Avatar>
      </Button>
      <Drawer anchor="left" open={state} onClose={() => setState(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  alt="profile photo"
                  src={!!user.profile.avatar ? user.profile.avatar : ""}
                >
                  {user.username[0].toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.username}
                secondary={user.emails[0].address}
              />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton onClick={() => navigate("/App")}>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate("/Profile")}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary={"Profile"} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate("/Tasks")}>
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary={"Lista de Tarefas"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton sx={{ color: "red" }} onClick={logout}>
                <ListItemIcon>
                  <Logout sx={{ color: "red" }} />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
