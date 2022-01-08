import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CalendarBase } from 'components/CalendarBase';
import { getDayState } from 'helpers';
import { DatePickerDay } from './styled';
import { withValueFormatters } from './hocs';

const getCalendarDate = (value) =>
  value ? value.clone().startOf('day') : moment();

function DatePicker({
  value,
  onChange,
  isDateDisabled,
  onChangePage,
  renderDay,
  colors,
  ...props
}) {
  const [date, setDate] = useState(() => getCalendarDate(value));

  useEffect(() => {
    setDate(getCalendarDate(value));
  }, [value]);

  const handleChangePage = (newDate) => {
    setDate(newDate);
    onChangePage(newDate);
  };

  return (
    <CalendarBase
      {...props}
      date={date}
      onChangePage={handleChangePage}
      colors={colors}
      renderDay={(date) => {
        const isDisabled = isDateDisabled(date);
        return renderDay({
          date,
          state: getDayState(date, value, isDisabled),
          onClick: isDisabled ? undefined : () => onChange(date),
          colors: colors.day,
        });
      }}
    />
  );
}

const DatePickerWrapped = withValueFormatters(DatePicker);

DatePickerWrapped.propTypes = {
  ...CalendarBase.propTypes,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  outputFormat: PropTypes.string,
  onChange: PropTypes.func,
  isDateDisabled: PropTypes.func,
};

DatePickerWrapped.defaultProps = {
  ...CalendarBase.defaultProps,
  onChange: () => {},
  isDateDisabled: () => false,
  renderDay: ({ date, state, onClick, colors }) => (
    <DatePickerDay state={state} onClick={onClick} colors={colors}>
      {date.date()}
    </DatePickerDay>
  ),
};

export default DatePickerWrapped;
