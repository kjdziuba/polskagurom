// src/components/NavigationBar.js

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
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
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
    { title: "Home", path: "/" },
    { title: "Net Worth", path: "/networth" },
    { title: "Spending", path: "/spending" },
    { title: "News", path: "/news" },
    { title: "Notifications", path: "/notifications" },
    { title: "Future Me", path: "/futureme" },
    { title: "Profil", path: "/profil" }
  ];

  return (
    <AppBar position="sticky" color="primary">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
            }}
          >
            Timewise Finance
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {navLinks.map((link) => (
              <Button
                key={link.title}
                component={Link}
                to={link.path}
                color="inherit"
                sx={{ marginLeft: 2 }}
              >
                {link.title}
              </Button>
            ))}
            <AuthButton />
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
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
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {navLinks.map((link) => (
                <MenuItem
                  key={link.title}
                  component={Link}
                  to={link.path}
                  onClick={handleCloseNavMenu}
                >
                  {link.title}
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                <AuthButton />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavigationBar;
