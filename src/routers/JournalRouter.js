import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import JournalScreen from "../components/journal/JournalScreen";

const JournalRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={JournalScreen} />

        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default JournalRouter;
