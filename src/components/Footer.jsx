import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";

export default function Footer() {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100vw",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        sx={{
          backgroundColor: "lightblue",
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
