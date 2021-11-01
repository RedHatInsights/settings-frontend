import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Skeleton from '@redhat-cloud-services/frontend-components/Skeleton';
import ErrorState from '@redhat-cloud-services/frontend-components/ErrorState';
import PageHeader, {
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import Main from '@redhat-cloud-services/frontend-components/Main';
import NotAuthorized from '@redhat-cloud-services/frontend-components/NotAuthorized';

import { register } from '../../store';
import reducers from '../../store/reducers';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { getSchema, saveValues, getConfig } from '../../actions';
import { RenderForms } from '../../PresentationalComponents';
import startCase from 'lodash/startCase';

export const getAppId = ({ params } = {}) => {
  return (params && params.id) || '';
};

const Applications = ({
  appsConfig,
  saveValues,
  match,
  getSchema,
  getConfig,
  configLoaded,
  loaded,
  schema,
  hasError,
}) => {
  const currApp =
    (appsConfig && appsConfig[getAppId(match)]) || getAppId(match);
  const appName =
    (currApp.frontend && currApp.frontend.title) || currApp.title || currApp;
  const [isAuthorized, setIsAuthorized] = useState(true); // keep this in case we need to check auth again later

  useEffect(() => {
    register(reducers);
    register({ notifications: notificationsReducer });
    if (!appsConfig) {
      getConfig();
    }
  }, []);

  useEffect(() => {
    if (currApp && typeof currApp !== 'string') {
      getSchema(currApp?.api?.apiName || match.params.id, currApp.api);
    }
  }, [currApp]);

  return (
    <React.Fragment>
      <PageHeader>
        <React.Fragment>
          <PageHeaderTitle
            title={isAuthorized ? 'Applications settings' : startCase(appName)}
          />
          {isAuthorized &&
            (configLoaded ? (
              <p className="pf-u-mt-sm">{`Settings for ${startCase(
                appName
              )}`}</p>
            ) : (
              <Skeleton size="sm" />
            ))}
        </React.Fragment>
      </PageHeader>
      {typeof isAuthorized === 'boolean' && !hasError && (
        <Main>
          {isAuthorized ? (
            <RenderForms
              loaded={loaded}
              schemas={schema}
              saveValues={(values) =>
                saveValues(
                  currApp?.api?.apiName || match.params.id,
                  values,
                  currApp.api,
                  currApp.title
                )
              }
            />
          ) : (
            <NotAuthorized serviceName={startCase(appName)} />
          )}
        </Main>
      )}
      {hasError && <ErrorState />}
    </React.Fragment>
  );
};

Applications.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  appsConfig: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      title: PropTypes.string,
      frontend: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
  configLoaded: PropTypes.bool,
  getSchema: PropTypes.func,
  loaded: PropTypes.bool,
  saveValues: PropTypes.func,
  getConfig: PropTypes.func,
  schema: PropTypes.arrayOf(PropTypes.object),
  hasError: PropTypes.bool,
};

function mapStateToProps({ applicationsStore }) {
  return {
    schema: applicationsStore && applicationsStore.schema,
    loaded: applicationsStore && applicationsStore.loaded,
    appsConfig: applicationsStore && applicationsStore.appsConfig,
    configLoaded: applicationsStore && applicationsStore.configLoaded,
    hasError: applicationsStore && applicationsStore.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getConfig: () => dispatch(getConfig()),
    getSchema: (application, { versions: [currVersion] } = { versions: [] }) =>
      dispatch(getSchema(application, currVersion)),
    saveValues: (
      application,
      values,
      { versions: [currVersion] } = { versions: [] },
      appTitle
    ) => dispatch(saveValues(application, values, currVersion, appTitle)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Applications);
