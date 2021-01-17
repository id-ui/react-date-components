export default {
  placeholder: {
    control: 'text',
    description: 'input placeholder',
  },
  name: {
    control: 'text',
    description: 'input name',
  },
  required: {
    control: 'boolean',
    description: 'can value be empty or not',
  },
  disabled: {
    control: 'boolean',
    description: 'is input disabled',
  },
  readOnly: {
    control: 'boolean',
    description: 'is input readOnly',
  },
  hasError: {
    control: 'boolean',
    description: 'is TextInput has error',
  },
  isClearable: {
    control: 'boolean',
    description: 'whether user can clear TextInput or not',
    defaultValue: true,
    table: {
      defaultValue: { summary: 'true' },
    },
  },
  onClear: {
    action: 'onClear',
    description: 'onClear input handler',
  },
  clearIconPlacement: {
    control: { type: 'select', options: ['right', 'left'] },
    description: 'placement of clear icon',
    defaultValue: 'right',
    table: {
      defaultValue: { summary: 'right' },
    },
  },
  isClearIconShown: {
    disable: true,
    description:
      'function that returns true if clear icon should be show depending on current value',
    table: {
      defaultValue: { summary: 'currentValue => Boolean(currentValue)' },
    },
  },
  leftAddon: {
    disable: true,
    description: 'element, embedded to the left side of TextInput',
  },
  rightAddon: {
    disable: true,
    description: 'element, embedded to the right side of TextInput',
    table: {
      defaultValue: {
        summary: 'calendar icon',
      },
    },
  },
  className: {
    control: 'text',
    description: 'TextInput container className',
  },
  children: {
    disable: true,
    description: 'elements, inserted right before rightAddon',
  },
  tabIndex: {
    control: 'number',
    description: 'input index for navigating using the Tab key',
  },
  autoComplete: {
    control: 'boolean',
    description: 'whether enable autocompletion or not',
  },
  autoFocus: {
    control: 'boolean',
    description: 'set focus on init',
  },
};
