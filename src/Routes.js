import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import asyncComponent from './Utilities/asyncComponent';
import some from 'lodash/some';

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

export const Routes = (props) => {
    const path = props.childProps.location.pathname;

    const stableRoutes =
        <React.Fragment>
            <InsightsRoute exact path={ paths.applications } component={ Applications } rootClass='applications'/>
            <Route render={ () => some(paths, p => p === path) ? null : (<Redirect to='/applications/insights'/>) }/>
        </React.Fragment>;

    const betaRoutes =
        <React.Fragment>
            <InsightsRoute path={ paths.general } component={ General } rootClass='general'/>
            <InsightsRoute exact path={ paths.applications } component={ Applications } rootClass='applications'/>
            <Route render={ () => some(paths, p => p === path) ? null : (<Redirect to={ paths.general }/>) }/>
        </React.Fragment>;

    return (
        <Switch>
            { window.insights.chrome.isBeta()
                ? { ...stableRoutes }
                : { ...betaRoutes }
            }
        </Switch>
    );
};

Routes.propTypes = {
    childProps: PropTypes.shape({
        location: PropTypes.shape({
            pathname: PropTypes.string
        })
    })
};
