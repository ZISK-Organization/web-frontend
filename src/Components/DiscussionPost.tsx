import React, { useState } from "react";
import { createStyles, makeStyles, Theme, Avatar, Typography, Button } from "@material-ui/core";

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
  })
);

interface IProps {
  post: any;
  offset?: number;
}

export default function DiscussionPost({ post, offset }: IProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  offset = offset ? offset : 0;

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
        <Button color="primary">Odpovědět</Button>
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
            {post.children.map((ch: any) => (
              <DiscussionPost post={ch} key={ch.id} />
            ))}
          </>
        )}
      </div>
      <br />
      <br />
    </>
  );
}
