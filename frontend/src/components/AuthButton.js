// src/components/AuthButton.js

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const AuthButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return isAuthenticated ? (
    <Button
      color="inherit"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </Button>
  ) : (
    <Button color="inherit" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

export default AuthButton;
