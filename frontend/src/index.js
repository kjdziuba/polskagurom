import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "@fontsource/roboto"; // Import Roboto font

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Auth0Provider
    domain="dev-ooe86kjwycuzft4q.us.auth0.com"
    clientId="uowWTaieSdNAcMj7vS4XH4GtIPoyZQoK"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Auth0Provider>
);
