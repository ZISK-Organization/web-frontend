import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { LayoutProvider } from "./Layout/LayoutContext";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-da966h82.eu.auth0.com"
    clientId="ca54COMWeajsVpyS4jXEfkYKYR2NRc08"
    redirectUri={`${window.location.origin}/loginRedirect`}
    cacheLocation="localstorage"
  >
    <BrowserRouter>
      <LayoutProvider>
        <App />
      </LayoutProvider>
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
reportWebVitals();
