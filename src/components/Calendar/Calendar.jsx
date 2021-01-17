import React, { useCallback, useEffect, useState } from 'react';
import { CalendarBase, Day } from 'components/CalendarBase';
import { getDayState, toMoment } from 'helpers';

function Calendar({ date: providedDate, onChangePage, ...props }) {
  const [date, setDate] = useState(() =>
    toMoment()(providedDate, true).startOf('day')
  );

  useEffect(() => {
    setDate(toMoment()(providedDate, true).startOf('day'));
  }, [providedDate]);

  const handleChangeDate = useCallback(
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
      onChangePage={handleChangeDate}
      renderDay={(date) => <Day state={getDayState(date)}>{date.date()}</Day>}
    />
  );
}

Calendar.propTypes = CalendarBase.propTypes;

Calendar.defaultProps = {
  ...CalendarBase.defaultProps,
  renderDay: ({ date, state }) => <Day state={state}>{date.date()}</Day>,
};

export default Calendar;
