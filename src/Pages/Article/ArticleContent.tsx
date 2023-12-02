import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { tasksService } from "../../Utils/ApiService";
import { useLayout } from "../../Layout/LayoutContext";

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
  id: string;
}

export default function ArticleContent({ id }: IProps) {
  const classes = useStyles();
  const [frameHeight, setFrameHeight] = useState("0px");
  const [content, setContent] = useState("");
  const layout = useLayout();

  useEffect(() => {
    tasksService.get(
      "/files/article",
      { id: id },
      {
        success: setContent,
        error: () => layout.error("Při načítání článku došlo k chybě"),
      }
    );
    //eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      iframeReady();
    }, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [frameHeight]);

  const iframeReady = () => {
    let iframe = document.getElementById("articleIframe") as HTMLIFrameElement;
    //@ts-ignore
    let iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
    if (iframeWin.document.body) {
      const newHeight = (iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight) + " px";
      if (newHeight !== frameHeight) setFrameHeight(newHeight);
    }
  };

  return (
    <>
      <iframe
        id="articleIframe"
        onLoad={iframeReady}
        className={classes.iframe}
        title="articleContent"
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
