import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes } from './Routes';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import ErroReducerCatcher from './PresentationalComponents/shared/ErrorReducerCatcher';

import './App.scss';

class App extends Component {
  componentDidMount() {
    const { history } = this.props;
    insights.chrome.init();
    insights.chrome.auth.getUser().then((user) =>
      this.setState({
        userReady: true,
        isAdmin: user.identity.user.is_org_admin,
      })
    );
    insights.chrome.identifyApp('applications');
    this.unregister = insights.chrome.on('APP_NAVIGATION', (event) => {
      if (event.domEvent) {
        history.push(
          `/${
            location.pathname.includes('applications') ? 'applications/' : ''
          }${event.navId}`
        );
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <NotificationsPortal />
        <ErroReducerCatcher>
          <Routes childProps={this.props} />
        </ErroReducerCatcher>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  history: PropTypes.object,
};

export default withRouter(connect()(App));
