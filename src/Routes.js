import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import asyncComponent from './Utilities/asyncComponent';

const Applications = asyncComponent(() =>
  import(
    /* webpackChunkName: "Applications" */ './SmartComponents/Applications/Applications'
  )
);

const paths = {
  applications: '/applications/:id',
};

const InsightsRoute = ({ component: Component, rootClass, ...rest }) => {
  const root = document.getElementById('root');
  root.removeAttribute('class');
  root.classList.add(`page__${rootClass}`, 'pf-c-page__main');
  root.setAttribute('role', 'main');

  return <Route {...rest} component={Component} />;
};

InsightsRoute.propTypes = {
  component: PropTypes.func,
  rootClass: PropTypes.string,
};

export const Routes = () => {
  return (
    <Switch>
      <InsightsRoute
        exact
        path={paths.applications}
        component={Applications}
        rootClass="applications"
      />
      <Route render={() => <Redirect to="/applications/insights" />} />
    </Switch>
  );
};

Routes.propTypes = {
  childProps: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
};
