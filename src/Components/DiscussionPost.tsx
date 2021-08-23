import React, { useState } from "react";
import { createStyles, makeStyles, Theme, Avatar, Typography, Button } from "@material-ui/core";
import { Post } from "../Types/discussion";
import NewPostEditor from "./NewPostEditor";

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
    frame: {
      width: "100%",
      border: "none",
    },
  })
);

interface IProps {
  post: Post;
  setPost: (newPost: Post) => void;
  offset?: number;
}

export default function DiscussionPost({ post, setPost, offset }: IProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [responseExpanded, setResponseExpanded] = useState(false);
  const [frameHeight, setFrameHeight] = useState("0px");

  const iframeReady = () => {
    let iframe = document.getElementById(`iframeTarget-${post.id}`) as HTMLIFrameElement;
    //@ts-ignore
    let iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
    if (iframeWin.document.body)
      setFrameHeight((iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight) + " px");
  };

  offset = offset ? offset : 0;

  return (
    <>
      <div className={classes.header}>
        <Avatar>{post.author[0]}</Avatar>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          <Typography variant="h6">{post.author}</Typography>
          <Typography color="textSecondary">{new Date(post.creationDate).toLocaleString()}</Typography>
        </span>
      </div>
      <hr />
      <div className={classes.body}>
        <iframe
          id={`iframeTarget-${post.id}`}
          className={classes.frame}
          srcDoc={`<head><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /></head><body style="font-family: Roboto, sans-serif">${post.content}</body>`}
          title={post.creationDate + "-content"}
          onLoad={iframeReady}
          height={frameHeight}
        />
        <br />
        {!responseExpanded && (
          <Button color="primary" onClick={() => setResponseExpanded(true)}>
            Odpovědět
          </Button>
        )}
        {responseExpanded && (
          <NewPostEditor
            onCreate={(newPost) => {
              setPost({ ...post, children: [...post.children, newPost] });
              setResponseExpanded(false);
            }}
            threadId={post.threadId}
            parentPostId={post.id}
            onCancel={() => setResponseExpanded(false)}
          />
        )}

        {post.children.length > 0 &&
          (expanded ? (
            <Button onClick={() => setExpanded(false)}>Skrýt odpovědi</Button>
          ) : (
            <Button onClick={() => setExpanded(true)}>Zobrazit odpovědi ({post.children.length})</Button>
          ))}
        {expanded && (
          <>
            <br />
            <br />
            {post.children.map((ch, i) => (
              <DiscussionPost
                post={ch}
                key={ch.id}
                setPost={(newPost) => {
                  const newChildren = [...post.children];
                  newChildren[i] = newPost;
                  setPost({ ...post, children: newChildren });
                }}
              />
            ))}
          </>
        )}
      </div>
      <br />
      <br />
    </>
  );
}
