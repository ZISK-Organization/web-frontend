import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme, Container, Avatar, Typography, Button } from "@material-ui/core";
import DiscussionPost from "../../Components/DiscussionPost";
import UploadMemeModal from "./UploadMemeModal";
import { Post, Thread } from "../../Types/discussion";
import { useLayout } from "../../Layout/LayoutContext";
import { discussionService, profilesService } from "../../Utils/ApiService";
import { User } from "../../Types/profiles";
import NewPostEditor from "../../Components/NewPostEditor";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      alignItems: "center",
    },
    body: {
      [theme.breakpoints.up("sm")]: {
        paddingLeft: 64,
      },
    },
    memeContainer: {
      textAlign: "center",
    },
    meme: {
      maxWidth: "90%",
    },
  })
);

function Meme({ meme, updateMeme }: { meme: Post; updateMeme: (newMeme: Post) => void }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [reactExpanded, setReactExpanded] = useState(false);
  const [author, setAuthor] = useState<User | undefined>(undefined);

  useEffect(() => {
    meme.author &&
      profilesService.get(
        "/",
        { userId: meme.author },
        {
          success: setAuthor,
          error: console.log,
        }
      );
  }, [meme.author]);

  return (
    <>
      <div className={classes.header}>
        <Avatar src={(author && author.image) || ""} />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          <Typography variant="h6">{(author && `${author.name} ${author.surname}`) || "Anonymní"}</Typography>
          <Typography color="textSecondary">{new Date(meme.creationDate).toLocaleString()}</Typography>
        </span>
      </div>
      <hr />
      <div className={classes.body}>
        <Typography>{meme.content}</Typography>
        <br />
        <div className={classes.memeContainer}>
          <img className={classes.meme} src={meme.details} alt="meme" />
        </div>
        <br />
        {!reactExpanded && (
          <Button color="primary" onClick={() => setReactExpanded(true)}>
            Reagovat
          </Button>
        )}
        {reactExpanded && (
          <NewPostEditor
            onCreate={(newPost) => {
              updateMeme({ ...meme, children: [...meme.children, newPost] });
              setReactExpanded(false);
            }}
            threadId={meme.threadId}
            parentPostId={meme.id}
            onCancel={() => setReactExpanded(false)}
          />
        )}{" "}
        {meme.children.length > 0 &&
          (expanded ? (
            <Button onClick={() => setExpanded(false)}>Skrýt reakce</Button>
          ) : (
            <Button onClick={() => setExpanded(true)}>Zobrazit reakce ({meme.children.length})</Button>
          ))}
        {expanded && (
          <>
            <br />
            <br />
            {meme.children.map((ch: Post) => (
              <DiscussionPost post={ch} key={ch.id} setPost={() => {}} />
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default function Memes() {
  // const classes = useStyles();
  const [memes, setMemes] = useState<Thread | undefined>(undefined);
  const layout = useLayout();

  useEffect(() => {
    discussionService.get(
      "/thread",
      {
        channel: "memes",
        channelType: "memes",
      },
      {
        success: (mm: Thread) => setMemes({ ...mm, children: mm.children.reverse() }),
        error: () => layout.error("Při načítání memes došlo k chybě."),
      }
    );
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <>
          <br />
          <br />
          {memes &&
            memes.children.map((meme, i) => (
              <React.Fragment key={i}>
                <Meme
                  meme={meme}
                  updateMeme={(newMeme) => {
                    const newMemes = [...memes.children];
                    newMemes[i] = newMeme;
                    setMemes({ ...memes, children: newMemes });
                  }}
                />
                <br />
                <br />
              </React.Fragment>
            ))}
        </>
      </Container>
      {memes && (
        <UploadMemeModal threadId={memes.id} onSave={(meme) => setMemes({ ...memes, children: [...memes.children, meme] })} />
      )}
    </>
  );
}
