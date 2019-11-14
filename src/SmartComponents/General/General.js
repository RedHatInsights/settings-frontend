import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';

import {
    Title,
    EmptyState,
    EmptyStateVariant,
    EmptyStateIcon,
    EmptyStateBody
} from '@patternfly/react-core';

import { CubesIcon } from '@patternfly/react-icons';

class General extends Component {

    render() {
        return (
            <React.Fragment>
                <PageHeader>
                    <PageHeaderTitle title='General'/>
                </PageHeader>
                <Main>
                    <EmptyState variant={ EmptyStateVariant.full }>
                        <EmptyStateIcon icon={ CubesIcon } />
                        <Title headingLevel="h5" size="lg">
                            No general settings found
                        </Title>
                        <EmptyStateBody>
                            There are currently no general settings.
                        </EmptyStateBody>
                    </EmptyState>
                </Main>
            </React.Fragment>
        );
    }
}

export default withRouter(General);
