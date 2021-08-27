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
import { Post } from "../../Types/discussion";
import { discussionService, tasksService } from "../../Utils/ApiService";
import { useLayout } from "../../Layout/LayoutContext";
import { useAuth0 } from "@auth0/auth0-react";

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

interface IProps {
  onSave: (meme: Post) => void;
  threadId: number;
}

export default function UploadMemeModal({ onSave, threadId }: IProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [memeFileName, setMemeFileName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [memeDescription, setMemeDescription] = useState("");
  const layout = useLayout();

  const isValid = memeFileName.length > 0;

  const { isAuthenticated, user } = useAuth0();

  const save = () => {
    if (isAuthenticated || isAnonymous) {
      const p = {
        id: null,
        author: isAnonymous ? null : user?.sub,
        content: memeDescription,
        details: `https://api.zisk-go.com/tasks/files/getMeme?fileName=${memeFileName}`,
        creationDate: null,
        threadId: threadId,
        children: [],
      };
      discussionService.post("post", {}, p, {
        success: (id: number) => {
          onSave({ ...p, id: id, creationDate: new Date() } as Post);
          setOpen(false);
        },
        error: () => layout.error("Při odesílání příspěvku došlo k chybě"),
      });
    }
  };

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
          <TextField
            value={memeDescription}
            onChange={(e) => setMemeDescription(e.target.value)}
            fullWidth
            label="Popis"
            multiline
          />
          <br />
          <br />
          <Typography variant="h6">Meme</Typography>
          <DropzoneArea
            filesLimit={1}
            maxFileSize={1067008}
            onChange={(file: File[]) =>
              file.length > 0 &&
              tasksService.uploadFile(
                "/files/uploadMeme",
                file[0],
                {},
                {
                  success: setMemeFileName,
                  error: () => layout.error("Při nahrávání došlo k chybě"),
                }
              )
            }
          />
          <br />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} color="primary" />
            <Typography> Nahrát anonymě</Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={save} color="primary" disabled={!isValid}>
            Nahrát
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
