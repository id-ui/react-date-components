import { CURRENT_DATE } from 'config/constants';

const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;

export const getTimeOptions = ({
  timeSlot,
  valueKey,
  labelKey,
  format,
  outputFormat,
}) => {
  const timeSlotsPerHour = MINUTES_PER_HOUR / timeSlot;

  return Array.from(
    { length: HOURS_PER_DAY * timeSlotsPerHour + 1 },
    (_, index) => {
      const date = CURRENT_DATE.clone().set({ minutes: index * timeSlot });

      return {
        [valueKey]: date.format(outputFormat),
        [labelKey]: date.format(format),
      };
    }
  );
};
