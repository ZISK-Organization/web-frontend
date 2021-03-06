import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useLayout } from "../../Layout/LayoutContext";
import { tasksService } from "../../Utils/ApiService";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iframe: {
      border: "none",
      width: "100%",
      overflowY: "hidden",
    },
  })
);

interface IProps {
  taskId: string;
}

export default function Solution({ taskId }: IProps) {
  const classes = useStyles();

  const [frameHeight, setFrameHeight] = useState("0px");
  const [content, setContent] = useState("");
  const layout = useLayout();
  const { isAuthenticated, user } = useAuth0();

  //@ts-ignore
  const isAdmin = isAuthenticated && user["https://zisk-go.com/roles"].includes("admin");

  useEffect(() => {
    tasksService.get(
      isAdmin ? "/files/admin/solution" : "/files/solution",
      { taskId: taskId },
      {
        success: setContent,
        error: () => layout.error("Při načítání řešení úlohy došlo k chybě"),
      }
    );
    //eslint-disable-next-line
  }, [taskId]);

  const iframeReady = () => {
    let iframe = document.getElementById("assignmentIframe") as HTMLIFrameElement;
    //@ts-ignore
    let iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
    if (iframeWin.document.body)
      setFrameHeight((iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight) + " px");
  };

  return (
    <>
      <iframe
        id="assignmentIframe"
        onLoad={iframeReady}
        className={classes.iframe}
        title="taskAssignment"
        height={frameHeight}
        srcDoc={`<html>
                  <head>
                      <link rel="stylesheet" href="/css/assignmentStyles.css" />
                      ${
                        (localStorage.getItem("theme") || "light") === "dark"
                          ? '<link rel="stylesheet" href="/css/assignmentDarkStyles.css" /></>'
                          : ""
                      }
                  </head>
                  <body>
                    ${content}
                    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
                      <script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
                      <script type="text/x-mathjax-config">
                        MathJax.Hub.Config({
                        "HTML-CSS": {
                        linebreaks: {automatic: true}
                        },
                        "SVG": {
                        linebreaks: {automatic: true}
                        }
                        });
                    </script>
                  </body>
                </html>`}
      />
    </>
  );
}
