import React, { useCallback, useState } from 'react';
import inputArgs from 'components/Input/args';
import { omit } from 'lodash';
import dateRangePickerStory from '../DateRangePicker/dateRangePicker.stories';
import DateRangeInput from './DateRangeInput';

export default {
  title: 'DateRangeInput',
  component: DateRangeInput,
  argTypes: {
    value: {
      control: 'text',
      description: 'current value (array of strings)',
    },
    onChange: {
      action: 'onChange',
      description: 'onChange event handler',
    },
    outputFormat: {
      control: 'text',
      description:
        'moment format for value (onChange will be called with array formatted values)',
      defaultValue: 'DD/MM/YYYY',
      table: {
        defaultValue: { summary: 'DD/MM/YYYY' },
      },
    },
    maskPlaceholder: {
      control: 'text',
      description: 'input mask placeholder (See @idui/react-mask-input)',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'whether close DateRangePicker on date select or not',
      defaultValue: true,
      table: {
        defaultValue: { summary: true },
      },
    },
    ...omit(dateRangePickerStory.argTypes, [
      'value',
      'onChange',
      'outputFormat',
    ]),
    ...inputArgs,
  },
};

export function Playground({ onChange, ...props }) {
  const [value, setValue] = useState();

  const handleChange = useCallback(
    (newValue) => {
      setValue(newValue);
      onChange(newValue);
    },
    [onChange]
  );

  return <DateRangeInput {...props} value={value} onChange={handleChange} />;
}

Playground.args = {
  onClear: undefined,
};
