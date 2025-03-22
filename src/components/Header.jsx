import * as React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeToggle } from "../theme/ThemeProvider";

export default function Header({ toggleDrawer }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Music App
        </Typography>
        <ThemeToggle />
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
