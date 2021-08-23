import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme, Container, Avatar, Typography, Button } from "@material-ui/core";
import DiscussionPost from "../../Components/DiscussionPost";
import memes from "../../Data/Mock/Memes.json";
import discussion from "../../Data/Mock/DiscussionThread.json";
import UploadMemeModal from "./UploadMemeModal";

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

function Meme({ meme }: { meme: any }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const findPost: (id: number, posts: any[]) => any = (id: number, posts: any[]) => {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === id) return posts[i];
      const chRes = findPost(id, posts[i].children);
      if (chRes !== undefined) return chRes;
    }
    return undefined;
  };

  const post = findPost(meme.discussionThread, discussion.posts);

  return (
    <>
      <div className={classes.header}>
        <Avatar>{post.author.name[0]}</Avatar>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          <Typography variant="h6">{post.author.name}</Typography>
          <Typography color="textSecondary">{new Date(post.date).toLocaleString()}</Typography>
        </span>
      </div>
      <hr />
      <div className={classes.body}>
        <Typography>{post.content}</Typography>
        <br />
        <div className={classes.memeContainer}>
          <img className={classes.meme} src={meme.image} alt="meme" />
        </div>
        <br />
        <Button color="primary">Reagovat</Button>
        {post.children.length > 0 &&
          (expanded ? (
            <Button onClick={() => setExpanded(false)}>Skrýt reakce</Button>
          ) : (
            <Button onClick={() => setExpanded(true)}>Zobrazit reakce ({post.children.length})</Button>
          ))}
        {expanded && (
          <>
            <br />
            <br />
            {post.children.map((ch: any) => (
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
  const [generatedMemes, setGeneratedMemes] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://meme-api.herokuapp.com/gimme/${memes.length}`).then((res) =>
      res.json().then((data) =>
        setGeneratedMemes(
          memes.map((m, i) => {
            return { ...m, image: data.memes[i].url };
          })
        )
      )
    );
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <>
          <br />
          <br />
          {generatedMemes.map((meme, i) => (
            <React.Fragment key={i}>
              <Meme meme={meme} />
              <br />
              <br />
            </React.Fragment>
          ))}
        </>
      </Container>
      <UploadMemeModal />
    </>
  );
}
