import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import { CalendarBase } from 'components/CalendarBase';
import moment from 'moment';
import PropTypes from 'prop-types';
import { getDateRangeDayState } from 'helpers';
import { DatePickerDay } from './styled';
import { useRange } from './hooks';
import { withValueFormatters } from './hocs';

function DateRangePicker({
  value: providedValue,
  onChange,
  isDateDisabled,
  onChangePage,
  renderDay,
  colors,
  ...props
}) {
  const [date, setDate] = useState(() => _.get(providedValue, 0) || moment());

  const { value, ...rangeHandlers } = useRange({
    value: providedValue,
    date,
    onChangePage: setDate,
    onChange,
  });

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
      colors={colors}
      renderDay={(date) => {
        const isDisabled = isDateDisabled(date);
        return renderDay({
          date,
          colors: colors.day,
          ...getDateRangeDayState(date, value, isDisabled),
          ...(isDisabled ? {} : rangeHandlers),
        });
      }}
    />
  );
}

const DateRangePickerWrapped = withValueFormatters(DateRangePicker);

DateRangePickerWrapped.propTypes = {
  ...CalendarBase.propTypes,
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ),
  outputFormat: PropTypes.string,
  onChange: PropTypes.func,
  isDateDisabled: PropTypes.func,
};

DateRangePickerWrapped.defaultProps = {
  ...CalendarBase.defaultProps,
  onChange: _.noop,
  isDateDisabled: _.constant(false),
  renderDay: ({ date, state, colors, ...handlers }) => (
    <DatePickerDay state={state} colors={colors} {...handlers}>
      {date.date()}
    </DatePickerDay>
  ),
};

export default DateRangePickerWrapped;
