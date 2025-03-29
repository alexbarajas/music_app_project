import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SearchIcon from "@mui/icons-material/Search";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

export default function Sidebar({ open }) {
  const theme = useTheme();

  // Width when open vs closed
  const drawerWidth = open ? 200 : 60;

  const menuItems = [
    { text: "Home", icon: <HomeIcon color="primary" />, path: "/" },
    {
      text: "Library",
      icon: <LibraryMusicIcon color="primary" />,
      path: "/library",
    },
    { text: "Search", icon: <SearchIcon color="primary" />, path: "/search" },
    {
      text: "Playlists",
      icon: <PlaylistAddIcon color="primary" />,
      path: "/playlists",
    },
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
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(0, 0, 0, 0.04)"
                    : "rgba(255, 255, 255, 0.08)",
              },
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
