import { Redirect, Route, Switch } from 'react-router-dom';
import React, { lazy } from 'react';

const Applications = lazy(() =>
  import(
    /* webpackChunkName: "ApplicationsPage" */ './SmartComponents/Applications/Applications'
  )
);

const paths = {
  applications: '/applications/:id',
};

export const Routes = () => {
  return (
    <Switch>
      <Route exact path={paths.applications} component={Applications} />
      <Route render={() => <Redirect to="/applications/advisor" />} />
    </Switch>
  );
};
