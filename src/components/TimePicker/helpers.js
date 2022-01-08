import { last } from 'lodash';
import { CURRENT_DATE } from 'config/constants';

const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;

export const getTimeOptions = ({
  timeSlot,
  valueKey,
  labelKey,
  outputFormat,
  divider,
}) => {
  const timeSlotsPerHour = MINUTES_PER_HOUR / timeSlot;
  const format = `HH${divider}mm`;

  const result = Array.from(
    { length: HOURS_PER_DAY * timeSlotsPerHour + 1 },
    (_, index) => {
      const date = CURRENT_DATE.clone().set({ minutes: index * timeSlot });

      return {
        [valueKey]: date.format(outputFormat),
        [labelKey]: date.format(format),
      };
    }
  );

  const lastOption = last(result);

  if (lastOption.value === `00${divider}00`) {
    lastOption.value = `24${divider}00`;
  }

  return result;
};
