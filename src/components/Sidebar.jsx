// src/components/Sidebar.jsx
import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 100,
        flexShrink: 0,
        position: "fixed",
        top: 60,
        left: 0,
        backgroundColor: "blueviolet",
        height: "calc(100vh - 60px)",
        "& .MuiDrawer-paper": {
          width: 100,
          boxSizing: "border-box",
          backgroundColor: "rosybrown",
        },
      }}
    >
      <List sx={{ marginTop: "64px", backgroundColor: "limegreen" }}>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        {/* Add more list items here */}
      </List>
    </Drawer>
  );
}
