import React, { useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";

interface IProps {
  children?: React.ReactNode;
  history: any;
}

function ScrollToTop({ history, children }: IProps) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
    //eslint-disable-next-line
  }, []);

  return <Fragment>{children}</Fragment>;
}

export default withRouter(ScrollToTop);
