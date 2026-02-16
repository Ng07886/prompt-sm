import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

export default function NavBar() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (next: boolean) => () => setOpen(next);

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/newsfeed">
            <ListItemText primary="Newsfeed" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/friends">
            <ListItemText primary="Friends" />
          </ListItemButton>
        </ListItem>

        {user ? (
          <ListItem disablePadding>
            <ListItemButton onClick={() => signOut()}>
              <ListItemText primary="Sign out" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Hamburger only on mobile */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { xs: "inline-flex", md: "none" } }}
          onClick={toggleDrawer(true)}
        >
          ☰
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            color: "inherit",
            textDecoration: "none",
            flex: 1,
            textAlign: "left",
          }}
        >
          Social App
        </Typography>

        {/* Inline nav for medium+ screens */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button component={Link} to="/newsfeed" color="inherit">
            Newsfeed
          </Button>
          <Button component={Link} to="/friends" color="inherit">
            Friends
          </Button>
          {user ? (
            <Button color="inherit" onClick={() => signOut()}>
              Sign out
            </Button>
          ) : (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          )}
        </Box>

        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
