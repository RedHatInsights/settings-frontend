import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes } from './Routes';
import { NotificationsPortal } from '@redhat-cloud-services/frontend-components-notifications';

import './App.scss';

class App extends Component {

    componentDidMount () {
        insights.chrome.init();
        if (location.pathname.indexOf('applications') !== -1) {
            insights.chrome.identifyApp('applications');
        } else {
            insights.chrome.identifyApp('');
        }
    }

    componentWillUnmount () {
        this.appNav();
        this.buildNav();
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

