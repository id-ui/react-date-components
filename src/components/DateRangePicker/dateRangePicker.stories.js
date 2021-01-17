import React, { useState } from 'react';
import calendarBaseArgTypes from 'components/CalendarBase/args';
import DateRangePicker from './DateRangePicker';

export default {
  title: 'DateRangePicker',
  component: DateRangePicker,
  argTypes: {
    value: {
      control: 'array',
      description:
        'current DatePicker value (array of strings or Moment objects)',
    },
    onChange: {
      action: 'onChange',
      description: 'onChange event handler',
    },
    outputFormat: {
      control: 'text',
      description:
        'moment format for value (onChange will be called with array of formatted values if outputFormat specified otherwise with array of Moment objects)',
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
        'day renderer, accepts {date, state, isFirstInRange, isLastInRange, onMouseDown, onMouseMove, onMouseUp} and should return rendered day',
      table: {
        defaultValue: {
          summary: `({ date, state, ...handlers }) => (<Day state={state} {...handlers}>{date.date()}</Day>)`,
        },
      },
    },
  },
};

export function Playground(props) {
  const [value, setValue] = useState();

  return <DateRangePicker {...props} value={value} onChange={setValue} />;
}

Playground.args = {};
