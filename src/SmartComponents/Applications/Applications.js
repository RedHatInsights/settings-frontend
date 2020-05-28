import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Skeleton, PageHeader, PageHeaderTitle, Main, NotAuthorized } from '@redhat-cloud-services/frontend-components';
import { register } from '../../store';
import reducers  from '../../store/reducers';
import { notifications } from '@redhat-cloud-services/frontend-components-notifications';
import { getSchema, saveValues, getConfig } from '../../actions';
import { RenderForms } from '../../PresentationalComponents';
import { startCase } from 'lodash';

export const getAppId = ({ params } = {}) => {
    return params && params.id || '';
};

const Applications = ({ appsConfig, saveValues, match, getSchema, getConfig, configLoaded, loaded, schema }) => {
    const currApp = appsConfig && appsConfig[getAppId(match)] || getAppId(match);
    const appName = ((currApp.frontend && currApp.frontend.title) || currApp.title) || currApp;
    const [ isOrgAdmin, setIsOrgAdmin ] = useState(false);

    useEffect(() => {
        register(reducers);
        register({ notifications });
        if (!appsConfig) {
            getConfig();
        }

        insights.chrome.auth.getUser().then((user) => setIsOrgAdmin(user.identity.user.is_org_admin));
    }, []);

    useEffect(() => {
        if (currApp && typeof currApp !== 'string') {
            getSchema(currApp?.api?.apiName || match.params.id, currApp.api);
        }
    }, [ currApp ]);

    return (
        <React.Fragment>
            <PageHeader>
                <React.Fragment>
                    <PageHeaderTitle title={ isOrgAdmin ? 'Applications settings' : startCase(appName) }/>
                    { isOrgAdmin && (
                        configLoaded ? <p>{ `Settings for ${startCase(appName)}` }</p> :
                            <Skeleton size='sm' />
                    )}
                </React.Fragment>
            </PageHeader>
            <Main>
                { isOrgAdmin ?
                    <RenderForms
                        loaded={ loaded }
                        schemas={ schema }
                        saveValues={ (values) => saveValues(currApp?.api?.apiName || match.params.id, values, currApp.api, currApp.title) }
                    />
                    : <NotAuthorized serviceName={ startCase(appName) }></NotAuthorized>
                }
            </Main>
        </React.Fragment>
    );
};

Applications.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    }),
    appsConfig: PropTypes.shape({
        [PropTypes.string]: PropTypes.shape({
            title: PropTypes.string,
            frontend: PropTypes.shape({
                title: PropTypes.string
            })
        })
    }),
    configLoaded: PropTypes.bool,
    getSchema: PropTypes.func,
    loaded: PropTypes.bool,
    saveValues: PropTypes.func,
    getConfig: PropTypes.func,
    schema: PropTypes.arrayOf(PropTypes.object)
};

function mapStateToProps({ applicationsStore }) {
    return {
        schema: applicationsStore && applicationsStore.schema,
        loaded: applicationsStore && applicationsStore.loaded,
        appsConfig: applicationsStore && applicationsStore.appsConfig,
        configLoaded: applicationsStore && applicationsStore.configLoaded
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getConfig: () => dispatch(getConfig()),
        getSchema: (application, { versions: [ currVersion ] } = { versions: []}) => dispatch(getSchema(application, currVersion)),
        saveValues: (application, values, { versions: [ currVersion ] } = { versions: []}, appTitle) =>
            dispatch(saveValues(application, values, currVersion, appTitle))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Applications);
