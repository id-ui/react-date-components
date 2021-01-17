import moment from 'moment';

export const DAYS_IN_WEEK = 7;
export const CURRENT_DATE = moment().startOf('day');

export const WEEK_DAYS = moment.weekdaysMin();
WEEK_DAYS.push(WEEK_DAYS[0]);
WEEK_DAYS.splice(0, 1);

export const DAY_STATES = {
  default: 'default',
  current: 'current',
  active: 'active',
  hover: 'hover',
  disabled: 'disabled',
};
