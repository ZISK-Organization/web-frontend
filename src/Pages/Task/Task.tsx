import React, { useState } from "react";
import { createStyles, makeStyles, Theme, Container, Typography, Tabs, Tab } from "@material-ui/core";
import FileModule from "./FileModule";
import task from "../../Data/Mock/Task.json";
import thread from "../../Data/Mock/DiscussionThread.json";
import DiscussionThread from "../../Components/DiscussionThread";
import Results from "./Results";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iframe: {
      border: "none",
      width: "100%",
    },
  })
);

interface IProps {
  taskId: number;
}

export default function Task({ taskId }: IProps) {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [frameHeight, setFrameHeight] = useState("0px");

  const iframeReady = () => {
    let iframe = document.getElementById("assignmentIframe") as HTMLIFrameElement;
    //@ts-ignore
    let iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
    if (iframeWin.document.body)
      setFrameHeight((iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight) + " px");
  };

  return (
    <Container maxWidth="xl">
      <br />
      <Typography variant="h3">{task.name}</Typography>
      <br />
      <Typography variant="subtitle1" component="span">
        <b>AUTOR:</b> {task.author}
      </Typography>
      <Typography variant="subtitle1" component="span">
        &nbsp;&nbsp;&nbsp;&nbsp;<b>DEADLINE:</b> {new Date(task.deadline).toLocaleString()}
      </Typography>
      <br />
      <br />
      <Tabs value={tab} onChange={(_, val) => setTab(val)} indicatorColor="primary" textColor="primary">
        <Tab label="Zadání" />
        <Tab label="Diskuze" />
        <Tab label="Hodnocení" />
        <Tab label="Vzorové řešení" />
      </Tabs>
      <br />
      {tab === 0 ? (
        <>
          <iframe
            id="assignmentIframe"
            onLoad={iframeReady}
            className={classes.iframe}
            title="taskAssignment"
            height={frameHeight}
            srcDoc={`<html>
                      <body style='
                            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                            font-weight: 400;
                            line-height: 1.43;
                            letter-spacing: 0.01071em;
                            text-align: justify
                      '>
                        ${task.content}
                      </body>
                    </html>`}
          />
          <br />
          {task.modules.map((module) => (module.type === "file" ? <FileModule module={module} /> : <></>))}
        </>
      ) : tab === 1 ? (
        <>
          <DiscussionThread thread={thread} />
        </>
      ) : tab === 2 ? (
        <>
          <Results maxPoints={task.points} results={task.results} />
        </>
      ) : (
        <>
          <iframe
            id="assignmentIframe"
            onLoad={iframeReady}
            className={classes.iframe}
            title="taskAssignment"
            height={frameHeight}
            srcDoc={`<html>
                  <body style='
                        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                        font-weight: 400;
                        line-height: 1.43;
                        letter-spacing: 0.01071em;
                        text-align: justify
                  '>
                    ${task.content}
                  </body>
                </html>`}
          />
        </>
      )}
    </Container>
  );
}
