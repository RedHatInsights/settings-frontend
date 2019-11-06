import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';

class General extends Component {

    render() {
        return (
            <React.Fragment>
                <PageHeader>
                    <PageHeaderTitle title='General'/>
                </PageHeader>
                <Main>
                    <h1> Sample Component </h1>
                </Main>
            </React.Fragment>
        );
    }
}

export default withRouter(General);
