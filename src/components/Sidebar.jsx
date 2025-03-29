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
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import FeaturedPlayListRoundedIcon from "@mui/icons-material/FeaturedPlayListRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";

export default function Sidebar({ open }) {
  const theme = useTheme();

  // Width when open vs closed
  const drawerWidth = open ? 200 : 60;

  const menuItems = [
    { text: "Home", icon: <HomeRoundedIcon />, path: "/" },
    { text: "Library", icon: <LibraryMusicRoundedIcon />, path: "/library" },
    { text: "Search", icon: <SearchRoundedIcon />, path: "/search" },
    {
      text: "Playlists",
      icon: <FeaturedPlayListRoundedIcon />,
      path: "/playlists",
    },
    {
      text: "Create Playlist",
      icon: <PlaylistAddRoundedIcon />,
      path: "/create-playlist",
    },
    { text: "Discover", icon: <ExploreRoundedIcon />, path: "/discover" },
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
              borderRadius: "8px",
              margin: "4px 8px",
              width: "auto",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "inherit",
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
