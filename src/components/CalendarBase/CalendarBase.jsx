import React, { Fragment, useCallback } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { WEEK_DAYS } from 'config/constants';
import { colors } from 'config/theme';
import Grid from './components/Grid';
import CalendarHeader from './components/Header';
import { Week, Day } from './styled';

function CalendarBase({
  date,
  onChangePage,
  renderDay,
  headerFormat,
  renderHeader,
  renderWeek,
  colors,
}) {
  const updateMonth = useCallback(
    (direction) => {
      const newDate = date
        .clone()
        .set({ month: date.month() + direction, date: 1 });

      onChangePage(newDate);
    },
    [date, onChangePage]
  );

  const goToPreviousPage = useCallback(() => updateMonth(-1), [updateMonth]);
  const goToNextPage = useCallback(() => updateMonth(1), [updateMonth]);

  return (
    <Fragment>
      {renderHeader({
        goToNextPage,
        goToPreviousPage,
        date,
        format: headerFormat,
        colors: colors.controls,
      })}
      {renderWeek(WEEK_DAYS, colors.day)}
      <Grid date={date} renderDay={renderDay} />
    </Fragment>
  );
}

CalendarBase.propTypes = {
  date: PropTypes.object,
  onChangePage: PropTypes.func,
  renderDay: PropTypes.func,
  headerFormat: PropTypes.string,
  renderHeader: PropTypes.func,
  renderWeek: PropTypes.func,
};

CalendarBase.defaultProps = {
  onChangePage: _.noop,
  headerFormat: 'MMMM YYYY',
  renderHeader: CalendarHeader,
  colors,
  renderWeek: (weekDays, colors) => (
    <Week>
      {weekDays.map((item) => (
        <Day key={item} colors={colors}>
          {item}
        </Day>
      ))}
    </Week>
  ),
};

export default CalendarBase;
