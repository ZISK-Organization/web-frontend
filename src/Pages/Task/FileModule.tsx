import React from "react";
import {
  Card,
  createStyles,
  makeStyles,
  Theme,
  CardContent,
  CardHeader,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    fileLink: {
      cursor: "pointer",
      textDecoration: "underline",
      color: "#0275d8",
    },
  })
);

interface IProps {
  module: any;
}

export default function FileModule({ module }: IProps) {
  const classes = useStyles();

  return (
    <>
      <Card>
        <CardHeader className={classes.header} title={module.name} />
        <CardContent>
          <Typography color="textSecondary">{module.description}</Typography>
          <br />
          <Typography className={classes.fileLink}>Submission.pdf</Typography>
          <br />
          <DropzoneArea onChange={(x) => console.log(x)} maxFileSize={9999999999} filesLimit={1} />
        </CardContent>
        <CardActions>
          <Button color="primary">Odevzdat</Button>
        </CardActions>
      </Card>
      <br />
      <br />
    </>
  );
}
