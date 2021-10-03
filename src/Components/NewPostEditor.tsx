import React, { useState } from "react";
import { Button, Checkbox, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";
import { Post } from "../Types/discussion";
import { discussionService } from "../Utils/ApiService";
import { useAuth0 } from "@auth0/auth0-react";
import { useLayout } from "../Layout/LayoutContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

interface IProps {
  parentPostId?: number;
  threadId: number;
  onCreate: (newPost: Post) => void;
  onCancel: () => void;
}

export default function NewPostEditor({ onCreate, onCancel, threadId, parentPostId }: IProps) {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [anonymously, setAnonymously] = useState(false);
  const layout = useLayout();

  const { isAuthenticated, user } = useAuth0();

  const save = () => {
    const p = {
      id: null,
      author: anonymously || !isAuthenticated ? null : user?.sub,
      content: text,
      details: "",
      creationDate: null,
      threadId: threadId,
      parentId: parentPostId,
      children: [],
    };
    discussionService.post("post", {}, p, {
      success: (id: number) => onCreate({ ...p, id: id, creationDate: new Date() } as Post),
      error: () => layout.error("Při odesílání příspěvku došlo k chybě"),
    });
  };

  return (
    <div className={classes.root}>
      <Editor
        apiKey="ps028du9wwolkoerx517fguyakk78mqk4vjw1ekmnthu65si"
        init={{
          plugins: [
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help",
          automatic_uploads: true,
          height: 320,
          images_reuse_filename: true,
          //TODO move to our api
          images_upload_url: `https://api.magistrmartin.cz/images/uploadImage`,
          images_upload_base_path: "https://api.magistrmartin.cz/images/noauth/image/images/",
        }}
        onChange={(e) => setText(e.target.getContent())}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          checked={anonymously || !isAuthenticated}
          disabled={!isAuthenticated}
          onChange={() => setAnonymously(!anonymously)}
          color="primary"
        />
        <Typography> Nahrát anonymě</Typography>
      </div>
      <Button color="primary" onClick={save}>
        Odeslat
      </Button>
      <Button color="secondary" onClick={onCancel}>
        Zrušit
      </Button>
    </div>
  );
}
