import React from 'react';
import PropTypes from 'prop-types';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf4-component-mapper';
import { Skeleton } from '@redhat-cloud-services/frontend-components';
import { Stack, StackItem, Card, CardBody } from '@patternfly/react-core';
import FormRender from '@data-driven-forms/react-form-renderer';

const RenderForms = ({ schemas, loaded, saveValues, ...props }) => (
    <Stack { ...props }>
        { loaded
            ?  schemas.map((schema, i) => (
                <StackItem key={ `settings-form-${i}` }>
                    <Card>
                        <CardBody>
                            <FormRender
                                formFieldsMapper={ formFieldsMapper }
                                layoutMapper={ layoutMapper }
                                schema={ schema }
                                onSubmit={ saveValues }
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
    </Stack>
);

RenderForms.propTypes = {
    schemas: PropTypes.arrayOf(PropTypes.shape({})),
    loaded: PropTypes.bool,
    appId: PropTypes.string,
    saveValues: PropTypes.func
};

RenderForms.defaultProps = {
    saveValues: () => undefined
};

export default RenderForms;
