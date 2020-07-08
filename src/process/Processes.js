import React from "react";
import { useRouteMatch, Route, Switch } from "react-router-dom";
import Process from "./Process";

export default function Processes() {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:processId`}>
          <Process />
        </Route>
        {/* <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route> */}
      </Switch>
    </div>
  );
}
