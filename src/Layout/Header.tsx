import React from "react";
import { AppBar, createStyles, Hidden, IconButton, makeStyles, Theme, Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { Menu as MenuIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bar: {
      height: "88px",
      paddingLeft: "122px",
      paddingTop: "8px",
    },

    logo: {
      width: "72px",
      height: "72px",
      top: "8px",
      left: "22px",
      position: "absolute",
    },

    menuIcon: {
      top: "20px",
      right: "22px",
      position: "absolute",
      color: "white",
    },

    menu: {
      height: "42px",
      width: "100%",
      zIndex: 999,
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      position: "absolute",
    },

    menuItem: {
      fontSize: "1.1rem",
      marginLeft: "16px",
      marginTop: "6px",
      float: "left",
      cursor: "pointer",
      height: "32px",
      "&:hover": {
        color: "#757575",
      },
    },

    menuItemActive: {
      borderBottom: "4px solid black",
    },

    menuRepairer: {
      width: "100%",
      height: 42,
    },

    loginButton: {
      top: "20px",
      right: "22px",
      position: "absolute",
      cursor: "pointer",
      color: "white",
      textAlign: "center",
    },

    menuProfileBox: {
      textAlign: "center",
    },
    pointer: {
      cursor: "pointer",
    },
    avatar: {
      height: 44,
      width: 44,
      borderRadius: "50%",
    },
  })
);

interface IProps {
  openMobileNavbar: () => void;
  loginWithRedirect: () => void;
  logout: (info: { returnTo: string }) => void;
  user?: {
    picture?: string;
    name?: string;
    email?: string;
  };
  isAuthenticated: boolean;
}

export default function Header({ openMobileNavbar, isAuthenticated, loginWithRedirect, user }: IProps) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <AppBar className={classes.bar} position="relative">
        <span onClick={() => history.push("/")} className={classes.pointer}>
          <img className={classes.logo} src={"/img/logo.svg"} alt="Logo" />
          <Typography variant="h2" style={{ flexGrow: 1, fontFamily: "Lato, Roboto, Helvetica, Arial, sans-serif" }}>
            ZISK
            <Hidden smDown>
              <Typography component="span"> Zábavné Informatické SuperKlání</Typography>
            </Hidden>
          </Typography>
        </span>
        <Hidden smUp>
          <IconButton className={classes.menuIcon} onClick={openMobileNavbar} aria-label="show menu">
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden xsDown>
          <>
            {isAuthenticated ? (
              <div className={classes.loginButton} style={{ top: 8 }} onClick={() => history.push("/Profile")}>
                <img className={classes.avatar} alt={user?.name || user?.email} src={user?.picture} />
                <br />
                <Typography variant="button">{user?.name || user?.email}</Typography>
              </div>
            ) : (
              <div className={classes.loginButton} onClick={loginWithRedirect}>
                <span>
                  <FontAwesomeIcon color="white" icon={faUser} />
                  <br />
                  <Typography variant="button">Přihlásit se</Typography>
                </span>
              </div>
            )}
          </>
        </Hidden>
      </AppBar>
      <Hidden xsDown>
        <div className={`${classes.menu} navbarTop`}>
          <Typography
            variant="h6"
            onClick={() => history.push("/Tasks")}
            className={classes.menuItem + (location.pathname === "/Tasks" ? " " + classes.menuItemActive : "")}
          >
            Úlohy
          </Typography>
          <Typography
            variant="h6"
            onClick={() => history.push("/Tutorials")}
            className={classes.menuItem + (location.pathname.includes("Tutorials") ? " " + classes.menuItemActive : "")}
          >
            Tutoriály
          </Typography>
          <Typography
            variant="h6"
            onClick={() => history.push("/Memes")}
            className={classes.menuItem + (location.pathname.includes("Memes") ? " " + classes.menuItemActive : "")}
          >
            Memes
          </Typography>
          <Typography
            variant="h6"
            onClick={() => history.push("/Results")}
            className={classes.menuItem + (location.pathname.includes("Results") ? " " + classes.menuItemActive : "")}
          >
            Výsledky
          </Typography>
          <Typography
            variant="h6"
            onClick={() => history.push("/About")}
            className={classes.menuItem + (location.pathname.includes("About") ? " " + classes.menuItemActive : "")}
          >
            O soutěži
          </Typography>
          <Typography
            variant="h6"
            onClick={() => history.push("/Discussion")}
            className={classes.menuItem + (location.pathname.includes("Discussion") ? " " + classes.menuItemActive : "")}
          >
            Diskuze
          </Typography>
        </div>
        <div className={classes.menuRepairer}>&nbsp;</div>
      </Hidden>
    </>
  );
}
