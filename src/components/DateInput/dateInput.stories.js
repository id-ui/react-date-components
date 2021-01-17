import React, { useState } from 'react';
import _ from 'lodash';
import inputArgs from 'components/Input/args';
import datePickerStory from 'components/DatePicker/datePicker.stories';
import DateInput from './DateInput';

export default {
  title: 'DateInput',
  component: DateInput,
  argTypes: {
    value: {
      control: 'text',
      description: 'current DateInput value (string)',
    },
    onChange: {
      action: 'onChange',
      description: 'onChange event handler',
    },
    outputFormat: {
      control: 'text',
      description: 'moment format for value',
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
      description: 'whether close DatePicker on date select or not',
      defaultValue: true,
      table: {
        defaultValue: { summary: true },
      },
    },
    ..._.omit(datePickerStory.argTypes, ['value', 'onChange', 'outputFormat']),
    ...inputArgs,
  },
};

export function Playground(props) {
  const [value, setValue] = useState();

  return <DateInput {...props} value={value} onChange={setValue} />;
}

Playground.args = {
  onClear: undefined,
};
