import { TextInput } from '@idui/react-inputs';
import { DAY_STATES } from './constants';

export const colors = {
  day: {
    [DAY_STATES.default]: {},
    [DAY_STATES.active]: {
      background: '#7546ae',
      color: '#ffffff',
    },
    [DAY_STATES.current]: {
      color: '#7546ae',
    },
    [DAY_STATES.disabled]: {
      color: '#efefef',
    },
    hover: {
      background: '#b787f1',
      color: '#ffffff',
    },
  },
  time: {
    active: {
      background: '#7546ae',
      color: '#ffffff',
    },
    default: {
      color: '#b4b4b4',
    },
    disabled: {
      color: '#d2d2d2',
    },
  },
  input: TextInput.defaultProps.colors,
  controls: {
    color: '#A569ED',
    hoverColor: '#7546AE',
    monthAndYear: '#7546AE',
  },
};
