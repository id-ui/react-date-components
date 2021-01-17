import React from 'react';
import calendarBaseArgTypes from 'components/CalendarBase/args';
import Calendar from './Calendar';

export default {
  title: 'Calendar',
  component: Calendar,
  argTypes: {
    date: {
      control: 'date',
      description:
        'date with month corresponding to the current calendar page (Date | String | Moment)',
      table: {
        defaultValue: { summary: 'current date' },
      },
    },
    ...calendarBaseArgTypes,
    renderDay: {
      disable: true,
      description:
        'day renderer, accepts moment date and day state and should return rendered day',
      table: {
        defaultValue: {
          summary: `({ date, state }) => (<Day state={state}>{date.date()}</Day>)`,
        },
      },
    },
  },
};

export function playground(props) {
  return <Calendar {...props} />;
}

playground.args = {};
