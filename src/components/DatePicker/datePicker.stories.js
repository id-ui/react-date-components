import React, { useState } from 'react';
import calendarBaseArgTypes from 'components/CalendarBase/args';
import DatePicker from './DatePicker';

export default {
  title: 'DatePicker',
  component: DatePicker,
  argTypes: {
    value: {
      control: 'text',
      description: 'current DatePicker value (string or Moment object)',
    },
    onChange: {
      action: 'onChange',
      description: 'onChange event handler',
    },
    outputFormat: {
      control: 'text',
      description:
        'moment format for value (onChange will be called with formatted value if outputFormat specified otherwise with Moment object)',
    },
    isDateDisabled: {
      disable: true,
      description:
        'function that accepts calendar day as Moment object and should return boolean if this day can be selected',
      table: {
        defaultValue: { summary: '() => false' },
      },
    },
    ...calendarBaseArgTypes,
    renderDay: {
      disable: true,
      description:
        'day renderer, accepts moment date, day state, and select day handler and should return rendered day',
      table: {
        defaultValue: {
          summary: `({ date, state, onClick }) => (<Day state={state} onClick={onClick}>{date.date()}</Day>)`,
        },
      },
    },
  },
};

export function Playground(props) {
  const [value, setValue] = useState();

  return <DatePicker {...props} value={value} onChange={setValue} />;
}

Playground.args = {};
