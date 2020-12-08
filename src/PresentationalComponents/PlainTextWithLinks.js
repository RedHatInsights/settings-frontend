import React from 'react';
import PropTypes from 'prop-types';
import { Text, TextVariants } from '@patternfly/react-core';

export const PlainTextWithLinks = ({ text, linkProps }) => {
  let linkIx = 0;
  const items = text.split(/<link>/).reduce((acc, curr) => {
    let slice = curr.split(/<\/link>/);
    if (slice.length === 2) {
      slice[0] = (
        <Text
          key={`link-${linkIx}`}
          rel="noreferrer noopener"
          className="pf-u-ml-md"
          component={TextVariants.a}
          target="_blank"
          {...linkProps[linkIx]}
        >
          {slice[0]}
        </Text>
      );
      linkIx++;
    }

    return [...acc, ...slice];
  }, []);
  return <Text component={TextVariants.p}>{items}</Text>;
};

PlainTextWithLinks.propTypes = {
  text: PropTypes.string.isRequired,
  linkProps: PropTypes.arrayOf(PropTypes.object).isRequired,
};
