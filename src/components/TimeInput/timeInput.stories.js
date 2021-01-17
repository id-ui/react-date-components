import React, { useState } from 'react';
import timePickerStory from 'components/TimePicker/timePicker.stories';
import inputArgs from 'components/Input/args';
import TimeInput from './TimeInput';

export default {
  title: 'TimeInput',
  component: TimeInput,
  argTypes: {
    ...timePickerStory.argTypes,
    maskPlaceholder: {
      control: 'text',
      description: 'input mask placeholder (See @idui/react-mask-input)',
      defaultValue: '__:__',
      table: {
        defaultValue: {
          summary: '__:__',
        },
      },
    },
    ...inputArgs,
  },
};

export function Playground(props) {
  const [value, setValue] = useState();

  return <TimeInput {...props} value={value} onChange={setValue} />;
}

Playground.args = {
  onClear: undefined,
};
