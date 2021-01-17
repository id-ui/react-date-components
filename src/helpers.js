import moment from 'moment';
import { CURRENT_DATE, DAY_STATES } from './config/constants';

export const toMoment = (format) => (value, withFallback = false) => {
  if (!value) {
    return withFallback ? moment() : null;
  }

  if (moment.isMoment(value)) {
    return value.clone();
  }

  const momentValue = moment(
    value instanceof Date ? value.toISOString() : value,
    format
  );

  return momentValue.isValid() ? momentValue : moment();
};

export const formatMoment = (format) => (value) =>
  value ? value.format(format) : value;

const DEFAULT_FORMAT = 'YYYY-MM-DD';
const VALID_DATE = '2021-01-01';

export const validateStartOfDate = (startOfDate, outputFormat) => {
  let paddedOutputFormat = outputFormat;
  let paddedStartOfDate = startOfDate;

  if (!/dDMYy/.test(outputFormat)) {
    paddedOutputFormat = `${DEFAULT_FORMAT} ${outputFormat}`;
    paddedStartOfDate = `${VALID_DATE} ${outputFormat}`;
  }

  if (paddedStartOfDate.length < paddedOutputFormat.length) {
    paddedStartOfDate += moment(VALID_DATE)
      .format(paddedOutputFormat)
      .substring(paddedStartOfDate.length);
    const dayIndex = paddedOutputFormat.toLowerCase().indexOf('d');
    paddedStartOfDate = `${paddedStartOfDate.substring(
      0,
      dayIndex
    )}${paddedStartOfDate.substring(dayIndex).replace(/^31/, '30')}`;
  }

  return moment(paddedStartOfDate, paddedOutputFormat).isValid();
};

export const getDayState = (date, value, isDisabled) => {
  if (isDisabled) {
    return DAY_STATES.disabled;
  }

  if (date.isSame(value)) {
    return DAY_STATES.active;
  }

  if (date.isSame(CURRENT_DATE)) {
    return DAY_STATES.current;
  }

  return DAY_STATES.default;
};

export const getDateRangeDayState = (
  date,
  [startDate, endDate] = [],
  isDisabled
) => {
  if (isDisabled) {
    return {
      state: DAY_STATES.disabled,
    };
  }

  if (date.isSame(startDate)) {
    return {
      state: DAY_STATES.active,
      isFirstInRange: true,
    };
  }

  if (date.isSame(endDate)) {
    return {
      state: DAY_STATES.active,
      isLastInRange: true,
    };
  }

  if (date.isAfter(startDate) && date.isBefore(endDate)) {
    return {
      state: DAY_STATES.hover,
    };
  }

  if (date.isSame(CURRENT_DATE)) {
    return {
      state: DAY_STATES.current,
    };
  }

  return {
    state: DAY_STATES.default,
  };
};
