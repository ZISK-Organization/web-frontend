import React from "react";
import { createStyles, makeStyles, Theme, Typography, Button } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { fileModuleMeta } from "../../../Types/taskTypes";

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
  module: fileModuleMeta;
}

export default function FileModule({ module }: IProps) {
  const classes = useStyles();

  return (
    <>
      <Typography>Odevzdané soubory</Typography>
      {/*TODO file icon*/}
      <Typography className={classes.fileLink}>Submission.pdf</Typography>
      <br />
      <DropzoneArea onChange={(x) => console.log(x)} maxFileSize={9999999999} filesLimit={1} />
      <br />
      <Button color="primary">Odevzdat</Button>
    </>
  );
}
