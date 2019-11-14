import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Skeleton, PageHeader, PageHeaderTitle, Main } from '@redhat-cloud-services/frontend-components';
import { Stack, StackItem, Card, CardBody } from '@patternfly/react-core';
import FormRender from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf4-component-mapper';
import registryDecorator from '@redhat-cloud-services/frontend-components-utilities/files/Registry';
import { register } from '../../store';
import reducers  from '../../store/reducers';
import { getSchema, saveValues } from '../../actions';

@registryDecorator()
class Applications extends Component {
    constructor(props) {
        super(props);
        register(reducers);
        props.getSchema(props.match.params.id);
        this.state = {
            appName: this.props.match.params.id
        };
    }

    renderForms(schemas, appName, loaded) {
        return (
            <Stack>
                { loaded
                    ?  schemas.map((schema, i) => (
                        <StackItem key={ `settings-form-${i}` }>
                            <Card>
                                <CardBody>
                                    <FormRender
                                        formFieldsMapper={ formFieldsMapper }
                                        layoutMapper={ layoutMapper }
                                        schema={ schema }
                                        onSubmit={ (values) => this.props.saveValues(appName, values) }
                                        canReset
                                    />
                                </CardBody>
                            </Card>
                        </StackItem>
                    ))
                    : <StackItem>
                        <Card>
                            <CardBody>
                                <Skeleton size='lg' />
                            </CardBody>
                        </Card>
                    </StackItem>
                }
            </Stack>);
    }

    render() {
        const { appName }  = this.state;
        const { loaded, schema } = this.props;
        return (
            <React.Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Applications Settings'/>
                    <p>{ `Settings for ${ appName }` }</p>
                </PageHeader>
                <Main>
                    { this.renderForms(schema, appName, loaded) }
                </Main>
            </React.Fragment>
        );
    }
}

Applications.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    }),
    getSchema: PropTypes.func,
    loaded: PropTypes.bool,
    saveValues: PropTypes.func,
    schema: PropTypes.arrayOf(PropTypes.object)
};

function mapStateToProps({ applicationsStore }) {
    return {
        schema: applicationsStore && applicationsStore.schema,
        loaded: applicationsStore && applicationsStore.loaded
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getSchema: (application) => dispatch(getSchema(application)),
        saveValues: (application, values) => dispatch(saveValues(application, values))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Applications);
