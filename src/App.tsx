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
import LoginRedirect from "./Pages/Profile/LoginRedirect";
import Profile from "./Pages/Profile/Profile";
import TutorialsCategory from "./Pages/TutorialsCategory/TutorialsCategory";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import Archive from "./Pages/Archive/Archive";

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
        <Route path="/Tasks/:id" exact render={({ match }: TaskProps) => <Task taskId={match.params.id} isTutorial={false} />} />
        <Route path="/Tutorials/:id" exact render={({ match }: TaskProps) => <TutorialsCategory categoryId={match.params.id} />} />
        <Route path="/Tutorial/:id" exact render={({ match }: TaskProps) => <Task taskId={match.params.id} isTutorial={true} />} />
        <Route path="/Tutorials" exact component={Tutorials} />
        <Route path="/Memes" exact component={Memes} />
        <Route path="/Results" exact component={Results} />
        <Route path="/About" exact component={About} />
        <Route path="/Discussion" exact component={Discussion} />
        <Route path="/Profile" exact component={Profile} />
        <Route path="/Archive" exact component={Archive} />

        <Route path="/PrivacyPolicy" exact component={PrivacyPolicy} />

        <Route path="/loginRedirect" exact component={LoginRedirect} />
        <Route component={Error404} />
      </Switch>
    </ScrollToTop>
  );
}
