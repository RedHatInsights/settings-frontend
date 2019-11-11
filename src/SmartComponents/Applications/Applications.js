/* eslint-disable */

import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Skeleton, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';
import FormRender from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf4-component-mapper';
import registryDecorator from '@redhat-cloud-services/frontend-components-utilities/files/Registry';
import { register } from '../../store';
import reducers  from '../../store/reduces.js';
import { getSchema } from '../../actions'



const localStorageKey = (appName, user) => `@@settings-${appName}-${user}`

@registryDecorator()
class Applications extends Component {
    constructor(props) {
        super(props);
        register(reducers);
        this.props.getSchema(props.match.params.id);
        this.state = {
            appName: this.props.match.params.id
        }
    }

    componentDidMount() {
        insights.chrome.auth.getUser().then(auth => ({user: auth.identity.user.username})).then(user => this.setState(user));
    }

    render() {
        const { appName, user }  = this.state;
        const { loaded, schema } = this.props; 
        return loaded
        ? (
            <React.Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Applications Settings'/>
                    <p>{ `Settings for ${ appName }` }</p>
                </PageHeader>
                    <FormRender
                        formFieldsMapper={formFieldsMapper}
                        layoutMapper={layoutMapper}
                        schema={schema}
                        onSubmit={(value) => localStorage.setItem(localStorageKey(appName, user), JSON.stringify(value))}
                        onCancel={() => console.log('Cancel action')}
                        initialValues={JSON.parse(localStorage.getItem(localStorageKey(appName, user))) || {}}
                    />
            </React.Fragment>
        )
        : <Skeleton size='lg' />
        ;
    }
}

Applications.propTypes =  {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    })
};


function mapStateToProps({ applicationsStore } ) {
    return { 
        schema: applicationsStore && applicationsStore.schema,
        loaded: applicationsStore && applicationsStore.loaded
    };
}


function mapDispatchToProps(dispatch) {
    return {
        getSchema: (application) => dispatch(getSchema(application))
    };
}
const ApplicationsConnected =  connect(mapStateToProps, mapDispatchToProps)(Applications);
export default ApplicationsConnected;
