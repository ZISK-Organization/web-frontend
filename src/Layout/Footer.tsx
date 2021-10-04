import React from "react";
import { createStyles, makeStyles, Theme, Typography, Container, IconButton, Tooltip, Grid } from "@material-ui/core";
import { Brightness4, Facebook, GetAppRounded, GitHub, Instagram, Mail, Policy, WhatsApp } from "@material-ui/icons";
import packageJson from "../../package.json";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: 32,
      paddingRight: 32,
      paddingTop: 12,
      paddingBottom: 4,
      borderTop: "solid 2px #f0f0f0",
      backgroundColor: theme.palette.secondary.main,
    },
    innerRoot: {
      display: "flex",
      justifyContent: "space-between",
    },
    link: {
      textDecoration: "none",
      color: "#007bff",
      cursor: "pointer",
    },
    logo: {
      height: 64,
      filter: "grayscale(95%) invert(90%)",
    },
    lowerRoot: {
      paddingTop: 4,
      paddingBottom: 4,
      borderTop: "solid 2px #f0f0f0",
      backgroundColor: theme.palette.secondary.main,
    },
  })
);

interface IProps {
  hidden: boolean;
  changeTheme: () => void;
}

export default function Footer({ hidden, changeTheme }: IProps) {
  const classes = useStyles();

  const serviceWorkerUnregistration = () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration of registrations) {
        registration.unregister();
      }
    });

    localStorage.setItem("userID", "");
    window.location.reload();
  };

  return (
    <>
      {!hidden && (
        <>
          <br />
          <div className={classes.root}>
            <Container maxWidth="xl">
              <div className={classes.innerRoot}>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <img src="/img/logo_large.svg" alt="logo" className={classes.logo} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div style={{ textAlign: "center", width: "100%" }}>
                      <Tooltip title="Sleduj nás na facebooku">
                        <IconButton>
                          <Facebook />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Sleduj nás na instagramu">
                        <IconButton>
                          <Instagram />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Sleduj nás na githubu">
                        <IconButton>
                          <GitHub />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Kontaktuj nás emailem">
                        <IconButton>
                          <Mail />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Kontaktuj nás whatsapp">
                        <IconButton>
                          <WhatsApp />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} style={{ textAlign: "right" }}>
                    <div style={{ textAlign: "right", width: "100%" }}>
                      <Tooltip title="Privacy policy">
                        <IconButton onClick={() => window.open("/PrivacyPolicy", "_blank")}>
                          <Policy />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Updatovat na novou verzi">
                        <IconButton onClick={() => serviceWorkerUnregistration()}>
                          <GetAppRounded />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Dark mode">
                        <IconButton onClick={changeTheme}>
                          <Brightness4 />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <div className={classes.lowerRoot}>
            <Container maxWidth="xl">
              <div style={{ textAlign: "center" }}>
                <Typography noWrap display="inline">
                  © Jakub Šťastný 2021&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;{packageJson.version}
                </Typography>
              </div>
            </Container>
          </div>
        </>
      )}
    </>
  );
}
