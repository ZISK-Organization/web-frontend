import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { LayoutProvider } from "./Layout/LayoutContext";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// import { Auth0Provider } from "@auth0/auth0-react";

const defaultTheme = createMuiTheme({
  palette: { primary: { main: "#b71c1c", contrastText: "#ffffff" }, secondary: { main: "#b3b3b3", contrastText: "#424242" } },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1480,
    },
  },
});
const { breakpoints } = defaultTheme;

const theme = {
  ...defaultTheme,
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: "6rem",
        [breakpoints.down("xs")]: {
          fontSize: "3.75rem",
        },
      },
      h2: {
        fontSize: "3.75rem",
        [breakpoints.down("xs")]: {
          fontSize: "3rem",
        },
      },
      h3: {
        fontSize: "3rem",
        [breakpoints.down("xs")]: {
          fontSize: "2.125rem",
        },
      },
      h4: {
        fontSize: "2.125rem",
        [breakpoints.down("xs")]: {
          fontSize: "1.5rem",
        },
      },
      h5: {
        fontSize: "1.5rem",
        [breakpoints.down("xs")]: {
          fontSize: "1.25rem",
        },
      },
      h6: {
        fontSize: "1.25rem",
        [breakpoints.down("xs")]: {
          fontSize: "1rem",
        },
      },
    },
  },
};

ReactDOM.render(
  // <Auth0Provider
  //   domain="dev-df6cho9g.eu.auth0.com"
  //   clientId="FptmnH13aKxwtEFWgNiRP2R5YXxSgqr6"
  //   redirectUri={`${window.location.origin}/Profile`}
  //   cacheLocation="localstorage"
  // >
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <LayoutProvider>
        <App />
      </LayoutProvider>
    </BrowserRouter>
  </MuiThemeProvider>,
  // </Auth0Provider>
  document.getElementById("root")
);

serviceWorkerRegistration.register();
