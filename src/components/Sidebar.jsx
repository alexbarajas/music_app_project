import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SearchIcon from "@mui/icons-material/Search";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

export default function Sidebar({ open }) {
  // Width when open vs closed
  const drawerWidth = open ? 200 : 60;

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Library", icon: <LibraryMusicIcon />, path: "/library" },
    { text: "Search", icon: <SearchIcon />, path: "/search" },
    { text: "Playlists", icon: <PlaylistAddIcon />, path: "/playlists" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          boxSizing: "border-box",
          top: 64, // Height of AppBar
          height: "calc(100% - 64px - 56px)", // Account for AppBar and Footer
          backgroundColor: "limegreen",
          overflowX: "hidden",
        },
      }}
    >
      <List sx={{ marginTop: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={item.text}
            sx={{
              minHeight: 48,
              px: 2.5,
              justifyContent: open ? "initial" : "center",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                opacity: open ? 1 : 0,
                display: open ? "block" : "none",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
