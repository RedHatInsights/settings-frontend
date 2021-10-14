import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormTemplate from '@data-driven-forms/pf4-component-mapper/form-template';
import componentMapper from '@data-driven-forms/pf4-component-mapper/component-mapper';
import Skeleton from '@redhat-cloud-services/frontend-components/Skeleton';
import { Stack, StackItem, Card, CardBody } from '@patternfly/react-core';
import { PlainTextWithLinks } from './PlainTextWithLinks';

import FormRender from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';
import validatorMapper from '@data-driven-forms/react-form-renderer/validator-mapper';
import DualListSortButton from '@data-driven-forms/pf4-component-mapper/dual-list-sort-button';

const componentMapperExtended = {
  ...componentMapper,
  'switch-field': componentMapper[componentTypes.SWITCH],
  'textarea-field': componentMapper[componentTypes.TEXTAREA],
  'select-field': componentMapper[componentTypes.SELECT],
  'plain-text-with-links': PlainTextWithLinks,
  [componentTypes.DUAL_LIST_SELECT]: {
    component: componentMapper[componentTypes.DUAL_LIST_SELECT],
    isFilterable: true,
    isSortable: true,
    isSearchable: true,
    resolveProps: (props) => ({
      ...(props.leftTitle && { availableOptionsTitle: props.leftTitle }),
      ...(props.rightTitle && { chosenOptionsTitle: props.rightTitle }),
    }),
    availableOptionsActions: [
      <DualListSortButton position="left" key="sort" />,
    ],
    chosenOptionsActions: [<DualListSortButton position="right" key="sort" />],
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

const RenderForms = ({ schemas, loaded, saveValues, ...props }) => {
  const [initialValues, setInitialValues] = useState();
  return (
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
                  onSubmit={(values, formApi) => {
                    setInitialValues(values);
                    formApi.initialize(values);
                    return saveValues(values);
                  }}
                  initialValues={initialValues}
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
};

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
