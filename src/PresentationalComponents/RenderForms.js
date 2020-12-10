import React from 'react';
import PropTypes from 'prop-types';
import FormTemplate from '@data-driven-forms/pf4-component-mapper/dist/cjs/form-template';
import componentMapper from '@data-driven-forms/pf4-component-mapper/dist/cjs/component-mapper';
import { Skeleton } from '@redhat-cloud-services/frontend-components';
import { Stack, StackItem, Card, CardBody } from '@patternfly/react-core';
import { PlainTextWithLinks } from './PlainTextWithLinks';

import FormRender from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/dist/cjs/validator-types';
import validatorMapper from '@data-driven-forms/react-form-renderer/dist/cjs/validator-mapper';

const componentMapperExtended = {
  ...componentMapper,
  'switch-field': componentMapper[componentTypes.SWITCH],
  'textarea-field': componentMapper[componentTypes.TEXTAREA],
  'select-field': componentMapper[componentTypes.SELECT],
  'plain-text-with-links': PlainTextWithLinks,
  [componentTypes.DUAL_LIST_SELECT]: {
    component: componentMapper[componentTypes.DUAL_LIST_SELECT],
    renderStatus: ({ selected, options }) =>
      `${selected} of ${options} selected`,
  },
};

const validatorMapperBridge = {
  'required-validator': validatorMapper[validatorTypes.REQUIRED],
  'pattern-validator': validatorMapper[validatorTypes.PATTERN],
  'min-length-validator': validatorMapper[validatorTypes.MIN_LENGTH],
  'url-validator': validatorMapper[validatorTypes.URL],
  'max-length-validator': validatorMapper[validatorTypes.MAX_LENGTH],
  'min-items-validator': validatorMapper[validatorTypes.MIN_ITEMS],
  'exact-length-validator': validatorMapper[validatorTypes.EXACT_LENGTH],
};

const FormTemplateWrapper = (props) => (
  <FormTemplate {...props} submitLabel="Save" canReset />
);

const RenderForms = ({ schemas, loaded, saveValues, ...props }) => (
  <Stack {...props} hasGutter>
    {loaded ? (
      schemas.map((schema, i) => (
        <StackItem key={`settings-form-${i}`}>
          <Card>
            <CardBody>
              <FormRender
                componentMapper={componentMapperExtended}
                FormTemplate={FormTemplateWrapper}
                schema={schema}
                submitLabel="Save"
                onSubmit={saveValues}
                validatorMapper={validatorMapperBridge}
              />
            </CardBody>
          </Card>
        </StackItem>
      ))
    ) : (
      <StackItem>
        <Card>
          <CardBody>
            <Skeleton size="lg" />
          </CardBody>
        </Card>
      </StackItem>
    )}
  </Stack>
);

RenderForms.propTypes = {
  schemas: PropTypes.arrayOf(PropTypes.shape({})),
  loaded: PropTypes.bool,
  appId: PropTypes.string,
  saveValues: PropTypes.func,
};

RenderForms.defaultProps = {
  saveValues: () => undefined,
};

export default RenderForms;
