import React, { useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Checkbox,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    uploadButton: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    inputMargin: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
    descriptionContainer: {
      margin: theme.spacing(1),
    },
  })
);

export default function UploadMemeModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const isValid = true;

  return (
    <>
      <Fab
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
        variant="extended"
        className={classes.uploadButton}
      >
        Nahrát MEME
      </Fab>
      <Dialog maxWidth="xl" fullWidth open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle>Nahrát MEME</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Popis" multiline />
          <br />
          <br />
          <Typography variant="h6">Meme</Typography>
          <DropzoneArea filesLimit={1} maxFileSize={1067008} onChange={() => {}} />
          <br />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox color="primary" />
            <Typography> Nahrát anonymě</Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => {}} color="primary" disabled={!isValid}>
            Nahrát
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
