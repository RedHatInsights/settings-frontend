import React, { useEffect } from 'react';
import { Routes } from './Routes';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import ErroReducerCatcher from './PresentationalComponents/shared/ErrorReducerCatcher';

import './App.scss';

const App = () => {
  const { updateDocumentTitle, on } = useChrome();
  updateDocumentTitle?.('Applications Settings - Applications');
  useEffect(() => {
    on('APP_NAVIGATION', (event) => {
      if (event.domEvent) {
        history.push(
          `/${
            location.pathname.includes('applications') ? 'applications/' : ''
          }${event.navId}`
        );
      }
    });
  }, [on]);

  return (
    <React.Fragment>
      <NotificationsPortal />
      <ErroReducerCatcher>
        <Routes />
      </ErroReducerCatcher>
    </React.Fragment>
  );
};

export default App;
