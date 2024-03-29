import React, { Component } from 'react';
import Skeleton from '@redhat-cloud-services/frontend-components/Skeleton';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component,
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : <Skeleton />;
    }
  }

  return AsyncComponent;
}
