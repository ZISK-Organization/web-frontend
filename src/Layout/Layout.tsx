import React, { useEffect, useState } from "react";
import { createStyles, Hidden, makeStyles, Theme, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Header from "./Header";
import MobileNavbar from "./SwipeableNavbar";
import Footer from "./Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert } from "@material-ui/lab";
import { useLocation } from "react-router-dom";
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

const themeStoredCode: string = localStorage.getItem("theme") || "light";

const getTheme = (theme: "dark" | "light") => {
  const defaultTheme = createMuiTheme({
    palette: {
      type: theme,
      primary: { main: "#b71c1c", contrastText: "#ffffff" },
      secondary: { main: theme === "light" ? "#b3b3b3" : "#1f1c1c", contrastText: theme === "light" ? "#424242" : "#cfc6c6" },
    },
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
  return {
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
};

export default function Layout(props: { children?: React.ReactNode }) {
  const { loginWithRedirect, user, isAuthenticated, logout /*, getAccessTokenSilently */ } = useAuth0();
  const classes = useStyles();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(themeStoredCode as "dark" | "light");
  const location = useLocation();

  const changeAppTheme = (theme: "dark" | "light") => {
    document.body.style.backgroundColor = "";
    document.body.style.color = "";

    if (theme === "dark") {
      document.body.style.backgroundColor = "#212121";
      document.body.style.color = "#fafafa";
    }

    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundColor = "#212121";
      document.body.style.color = "#fafafa";
    }
  });

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
    <MuiThemeProvider theme={getTheme(theme)}>
      <div className={classes.root}>
        {location.pathname.length > 1 && (
          <>
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
                isAuthenticated={isAuthenticated}
                loginWithRedirect={loginWithRedirect}
                user={user}
              />
            </Hidden>
            <br />
            <Alert style={{ width: "80%", marginLeft: "10%" }} severity="warning">
              Stránky jsou stále ve vývoji a testování. Postupem času budou přibývat nové funkce. Pokud narazíte na jakýkoliv
              problém, prosím kontaktujte organizátory.
            </Alert>
            <br />
          </>
        )}
        {props.children}
        <Footer hidden={false} changeTheme={() => (theme === "dark" ? changeAppTheme("light") : changeAppTheme("dark"))} />
      </div>
    </MuiThemeProvider>
  );
}
