import React from "react";
import {
  AppBar,
  // Avatar,
  // Box,
  createStyles,
  Hidden,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import MenuIcon from "@material-ui/icons/Menu";
// import { ExitToApp, Person } from "@material-ui/icons";

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
  })
);

interface IProps {
  openMobileNavbar: () => void;
  // loginWithRedirect: () => void;
  // logout: (info: { returnTo: string }) => void;
  // user: {
  //   picture: string;
  //   name: string;
  // };
  // isAuthenticated: boolean;
}

export default function Header({ openMobileNavbar /*isAuthenticated, loginWithRedirect, user, logout*/ }: IProps) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <AppBar className={classes.bar} position="relative">
        <span onClick={() => history.push("/")} className={classes.pointer}>
          <img className={classes.logo} src={"/img/logo.png"} alt="Logo" />
          <Typography variant="h2" style={{ flexGrow: 1, fontFamily: "Lato, Roboto, Helvetica, Arial, sans-serif" }}>
            ZISK
            <Hidden smDown>
              <Typography component="span"> Zábavné informatické soutěžní klání</Typography>
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
            {/* {isAuthenticated ? (
              <>
                <Avatar
                  src={user.picture}
                  className={classes.loginButton}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                />
                <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                  <Box width="100%" className={classes.menuProfileBox}>
                    <Avatar
                      src={user.picture}
                      alt={user.name}
                      style={{ marginLeft: "40%" }}
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                    />
                    <br />
                    <Typography variant="body1">{user.name}</Typography>
                  </Box>
                  <hr />
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      history.push("/Profile");
                    }}
                  >
                    <Person />
                    &nbsp;&nbsp;&nbsp;&nbsp;{T.Menu.Profile}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      logout({ returnTo: window.location.origin });
                    }}
                  >
                    <ExitToApp />
                    &nbsp;&nbsp;&nbsp;&nbsp;{T.Menu.Logout}
                  </MenuItem>
                </Menu>
              </>
            ) : ( */}
            <div className={classes.loginButton}>
              <span /*onClick={() => loginWithRedirect()}*/>
                <FontAwesomeIcon color="white" icon={faUser} />
                <br />
                <Typography variant="button">Přihlásit se</Typography>
              </span>
            </div>
            {/* <Button className={classes.loginButton} onClick={loginWithRedirect}>Přihlásit se</Button> */}
            {/* )} */}
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
