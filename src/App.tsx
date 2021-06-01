import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import Error404 from "./Errors/Error404";
import ScrollToTop from "./Layout/ScrollToTop";
import About from "./Pages/About/About";
import Discussion from "./Pages/Discussion/Discussion";
import Home from "./Pages/Home/Home";
import Memes from "./Pages/Memes/Memes";
import Results from "./Pages/Results/Results";
import Tasks from "./Pages/Tasks/Tasks";
import Task from "./Pages/Task/Task";
import Tutorials from "./Pages/Tutorials/Tutorials";

interface IdParams {
  id: string;
}

interface TaskProps extends RouteComponentProps<IdParams> {}

export default function App() {
  return (
    <ScrollToTop>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Tasks" exact component={Tasks} />
        <Route path="/Tasks/:id" exact render={({ match }: TaskProps) => <Task taskId={parseInt(match.params.id)} />} />
        <Route path="/Tutorials" exact component={Tutorials} />
        <Route path="/Memes" exact component={Memes} />
        <Route path="/Results" exact component={Results} />
        <Route path="/About" exact component={About} />
        <Route path="/Discussion" exact component={Discussion} />
        <Route component={Error404} />
      </Switch>
    </ScrollToTop>
  );
}
