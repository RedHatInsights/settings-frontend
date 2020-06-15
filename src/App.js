import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes } from './Routes';
import { NotificationsPortal } from '@redhat-cloud-services/frontend-components-notifications/';

import './App.scss';

class App extends Component {

    componentDidMount () {
        const { history } = this.props;
        insights.chrome.init();
        insights.chrome.auth.getUser().then((user) => this.setState({ userReady: true, isAdmin: user.identity.user.is_org_admin }));
        insights.chrome.identifyApp('applications');
        this.unregister = insights.chrome.on('APP_NAVIGATION', (event) => {
            if (event.domEvent) {
                history.push(`/${location.pathname.includes('applications') ? 'applications/' : ''}${event.navId}`);
            }
        });
    }

    componentWillUnmount () {
        this.appNav();
    }

    render () {
        return (
            <React.Fragment>
                <NotificationsPortal />
                <Routes childProps={ this.props } />
            </React.Fragment>
        );
    }
}

App.propTypes = {
    history: PropTypes.object
};

export default withRouter (connect()(App));

