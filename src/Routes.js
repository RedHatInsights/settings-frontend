import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import asyncComponent from './Utilities/asyncComponent';

const General = asyncComponent(() => import(/* webpackChunkName: "General" */ './SmartComponents/General/General'));
const Applications = asyncComponent(() => import(/* webpackChunkName: "Applications" */ './SmartComponents/Applications/Applications'));

const paths = {
    general: '/general',
    applications: '/applications/:id'
};

const InsightsRoute = ({ component: Component, rootClass, ...rest }) => {
    const root = document.getElementById('root');
    root.removeAttribute('class');
    root.classList.add(`page__${rootClass}`, 'pf-c-page__main');
    root.setAttribute('role', 'main');

    return (<Route { ...rest } component={ Component } />);
};

InsightsRoute.propTypes = {
    component: PropTypes.func,
    rootClass: PropTypes.string
};

export const Routes = () => {
    const stableRoutes =
        <Switch>
            <InsightsRoute exact path={ paths.applications } component={ Applications } rootClass='applications'/>
            <Route render={ () => <Redirect to="/applications/insights" /> } />
        </Switch>;

    const betaRoutes =
        <Switch>
            <InsightsRoute path={ paths.general } component={ General } rootClass='general'/>
            <InsightsRoute exact path={ paths.applications } component={ Applications } rootClass='applications'/>
            <Route render={ () => <Redirect to={ paths.general } /> } />
        </Switch>;

    return (
        window.insights.chrome.isBeta()
            ? { ...betaRoutes }
            : { ...stableRoutes }
    );
};

Routes.propTypes = {
    childProps: PropTypes.shape({
        location: PropTypes.shape({
            pathname: PropTypes.string
        })
    })
};
