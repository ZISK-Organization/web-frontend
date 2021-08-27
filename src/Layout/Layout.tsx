import React, { useState } from "react";
import { createStyles, Hidden, makeStyles, Theme } from "@material-ui/core";
import Header from "./Header";
import MobileNavbar from "./SwipeableNavbar";
import Footer from "./Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert } from "@material-ui/lab";
// import { profileService } from "../Utils/ApiService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: 10,
      [theme.breakpoints.up("sm")]: {
        fontSize: 18,
      },
      [theme.breakpoints.up("md")]: {
        fontSize: 20,
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: 24,
      },
      position: "relative",
    },
  })
);

export default function Layout(props: { children?: React.ReactNode }) {
  const { loginWithRedirect, user, isAuthenticated, logout /*, getAccessTokenSilently */ } = useAuth0();
  const classes = useStyles();
  const [navbarOpen, setNavbarOpen] = useState(false);

  // async function getAccessToken() {
  //   const accessToken = await getAccessTokenSilently({
  //     audience: "https://qrgamestudio.eu.auth0.com/api/v2/",
  //     scope: "read:current_user",
  //   });
  //   localStorage.setItem("QR-APIAccessToken", accessToken);
  // }

  // useEffect(() => {
  // if (isAuthenticated) {
  // profileService.post(
  //   "v1/noauth/register",
  //   {
  //     userId: user.sub,
  //     imagePath: user.picture,
  //     userName: user.name,
  //     email: user.email,
  //   },
  //   undefined,
  //   {
  //     success: console.log,
  //     error: console.log,
  //   }
  // );
  // getAccessToken();
  // } else {
  // localStorage.removeItem("APIAccessToken");
  // }

  // eslint-disable-next-line
  // }, [isAuthenticated]);

  return (
    <div className={classes.root}>
      <div style={{ flexGrow: 1 }}>
        <Header
          openMobileNavbar={() => setNavbarOpen(true)}
          isAuthenticated={isAuthenticated}
          loginWithRedirect={loginWithRedirect}
          user={user}
          logout={logout}
        />
      </div>
      <Hidden mdUp>
        <MobileNavbar
          open={navbarOpen}
          setOpen={setNavbarOpen}
          // isAuthenticated={isAuthenticated}
          // loginWithRedirect={loginWithRedirect}
          // user={user}
        />
      </Hidden>
      <br />
      <Alert style={{ width: "80%", marginLeft: "10%" }} severity="warning">
        Stránky jsou stále ve vývoji a testování. Postupem času budou přibývat nové funkce. Pokud narazíte na jakýkoliv problém,
        prosím kontaktujte organizátory.
      </Alert>
      <br />
      {props.children}
      <Footer hidden={false} />
    </div>
  );
}
