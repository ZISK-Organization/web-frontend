import React from "react";
import { Avatar, Box, Card, CardContent, createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";

interface IProps {
  photo: string;
  name: string;
  motto: string;
  email: string;
  github?: string;
  age: number;
  about: string;
  web?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      // margin: theme.spacing(1),
      // "& > *": {
      //   margin: theme.spacing(1),
      // },
      height: "100%",
    },
    large: {
      width: "80%",
      marginLeft: "10%",
      height: "100%",
    },
    dummy: {
      position: "fixed",
      marginTop: "50%",
    },
    link: {
      textDecoration: "none",
      color: "#007bff",
    },
    greyText: {
      color: "#5c5c5c",
    },
  })
);

export default function TeamMemberCard({ photo, name, age, motto, email, github, about, web }: IProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify="center" alignContent="center" alignItems="center">
          <Grid item xs={12} sm={4}>
            <Box width="100%">
              <div className={classes.dummy}></div>
              <Avatar src={photo} sizes="large" className={classes.large} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5">{name}</Typography>
            <Typography className={classes.greyText} variant="subtitle2">
              {motto}
            </Typography>
            <hr />
            <table>
              <tbody>
                <tr>
                  <td>
                    <Typography className={classes.greyText} variant="subtitle1">
                      Email
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="subtitle1">
                      <a href={`mailto:${email}`} className={classes.link} target="_blank" rel="noopener noreferrer">
                        {email}
                      </a>
                    </Typography>
                  </td>
                </tr>
                {github && (
                  <tr>
                    <td>
                      <Typography className={classes.greyText} variant="subtitle1">
                        Github&nbsp;&nbsp;&nbsp;&nbsp;
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="subtitle1">
                        <a href={github} className={classes.link} target="_blank" rel="noopener noreferrer">
                          {github.replace("https://", "")}
                        </a>
                      </Typography>
                    </td>
                  </tr>
                )}
                <tr>
                  <td>
                    <Typography className={classes.greyText} variant="subtitle1">
                      Age
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="subtitle1">{age}</Typography>
                  </td>
                </tr>
                {web && (
                  <tr>
                    <td>
                      <Typography className={classes.greyText} variant="subtitle1">
                        Web
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="subtitle1">
                        <a href={web} className={classes.link} target="_blank" rel="noopener noreferrer">
                          {web.replace("https://", "")}
                        </a>
                      </Typography>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <hr />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption">{about}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
