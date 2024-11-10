// frontend/src/components/NavigationBar.js

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import AuthButton from "./AuthButton";

function NavigationBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navLinks = [
    { title: "Net Worth", path: "/networth" },
    { title: "Spending", path: "/spending" },
    { title: "News", path: "/news" },
    { title: "Notifications", path: "/notifications" },
    { title: "Future Me", path: "/futureme" },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo and Title */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Timewise Finance
        </Typography>

        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="navigation menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {navLinks.map((link) => (
              <MenuItem
                key={link.title}
                onClick={handleCloseNavMenu}
                component={Link}
                to={link.path}
              >
                <Typography textAlign="center">{link.title}</Typography>
              </MenuItem>
            ))}
            <MenuItem onClick={handleCloseNavMenu}>
              <AuthButton />
            </MenuItem>
          </Menu>
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {navLinks.map((link) => (
            <Button
              key={link.title}
              color="inherit"
              component={Link}
              to={link.path}
            >
              {link.title}
            </Button>
          ))}
          <AuthButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
