import React, {  useEffect, useState } from 'react';
import { CalendarBase, Day } from 'components/CalendarBase';
import { getDayState, toMoment } from 'helpers';

function Calendar({
  date: providedDate,
  onChangePage,
  colors,
  renderDay,
  ...props
}) {
  const [date, setDate] = useState(() =>
    toMoment()(providedDate, true).startOf('day')
  );

  useEffect(() => {
    setDate(toMoment()(providedDate, true).startOf('day'));
  }, [providedDate]);

  const handleChangeDate = (newDate) => {
      setDate(newDate);
      onChangePage(newDate);
  }

  return (
    <CalendarBase
      {...props}
      date={date}
      onChangePage={handleChangeDate}
      renderDay={(date) =>
        renderDay({
          state: getDayState(date),
          date,
          colors: colors.day,
        })
      }
      colors={colors}
    />
  );
}

Calendar.propTypes = CalendarBase.propTypes;

Calendar.defaultProps = {
  ...CalendarBase.defaultProps,
  renderDay: ({ date, state, colors }) => (
    <Day colors={colors} state={state}>
      {date.date()}
    </Day>
  ),
};

export default Calendar;
