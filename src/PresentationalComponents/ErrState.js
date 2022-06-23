import React from 'react';
import propTypes from 'prop-types';
import ErrorState from '@redhat-cloud-services/frontend-components/ErrorState';

export const ErrState = ({ errorTitle, errorDescription }) => {
  return (
    <ErrorState
      errorTitle={errorTitle}
      errorDescription={
        <div dangerouslySetInnerHTML={{ __html: errorDescription }} />
      }
    />
  );
};

ErrState.propTypes = {
  errorTitle: propTypes.string,
  errorDescription: propTypes.string,
};
