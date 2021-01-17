import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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
  ...props
}) {
  const [date, setDate] = useState(() => getCalendarDate(value));

  useEffect(() => {
    setDate(getCalendarDate(value));
  }, [value]);

  const handleChangePage = useCallback(
    (newDate) => {
      setDate(newDate);
      onChangePage(newDate);
    },
    [onChangePage]
  );

  return (
    <CalendarBase
      {...props}
      date={date}
      onChangePage={handleChangePage}
      renderDay={(date) => {
        const isDisabled = isDateDisabled(date);
        return renderDay({
          date,
          state: getDayState(date, value, isDisabled),
          onClick: isDisabled ? undefined : () => onChange(date),
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
  onChange: _.noop,
  isDateDisabled: _.constant(false),
  renderDay: ({ date, state, onClick }) => (
    <DatePickerDay state={state} onClick={onClick}>
      {date.date()}
    </DatePickerDay>
  ),
};

export default DatePickerWrapped;
