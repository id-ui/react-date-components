import React, { useState } from 'react';
import TimePicker from './TimePicker';

export default {
  title: 'TimePicker',
  component: TimePicker,
  argTypes: {
    value: {
      control: 'text',
      description: 'current value (time string in outputFormat)',
    },
    onChange: {
      action: 'onChange',
      description: 'onChange event handler',
    },
    options: {
      disable: true,
      description:
        'custom array of time options (shape {[valueKey]: String, [labelKey]: String})',
    },
    emptyOptionPlaceholder: {
      control: 'text',
      description:
        'empty option placeholder, set to "" if you want don\'t want show any value',
      table: {
        defaultValue: {
          summary: '`--${divider}--`',
        },
      },
    },
    timeSlot: {
      control: 'number',
      description: 'time slot in minutes for generating options',
      defaultValue: 60,
      table: {
        defaultValue: {
          summary: 60,
        },
      },
    },
    valueKey: {
      control: 'text',
      description: 'option value key',
      defaultValue: 'value',
      table: {
        defaultValue: {
          summary: 'value',
        },
      },
    },
    labelKey: {
      control: 'text',
      description: 'option label key',
      defaultValue: 'label',
      table: {
        defaultValue: {
          summary: 'label',
        },
      },
    },
    divider: {
      control: 'text',
      description: 'divider between hours and minutes',
      defaultValue: ':',
      table: {
        defaultValue: {
          summary: ':',
        },
      },
    },
    visibleOptionsCount: {
      control: 'number',
      description: 'count of visible items. Should be odd.',
      defaultValue: 7,
      table: {
        defaultValue: {
          summary: 7,
        },
      },
    },
    outputFormat: {
      control: 'text',
      description:
        'moment format for value (onChange will be called with formatted value if no custom options)',
      defaultValue: 'HH:mm',
      table: {
        defaultValue: {
          summary: 'HH:mm',
        },
      },
    },
    isTimeDisabled: {
      disable: true,
      description:
        'function that accepts time string and should return boolean if this time can be selected (disabled options will be excluded)',
      table: {
        defaultValue: { summary: '() => false' },
      },
    },
    renderOption: {
      disable: true,
      description:
        'custom option renderer, provided with { data: option data, isSelected: is option selected, labelKey, valueKey, divider, onClick, theme }',
    },
    className: {
      control: 'text',
      description: 'TimePicker className',
    },
  },
};

export function Playground(props) {
  const [value, setValue] = useState();

  return <TimePicker {...props} value={value} onChange={setValue} />;
}

Playground.args = {};
