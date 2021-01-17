import React, { useMemo, useCallback, useState } from 'react';
import { AnimateSharedLayout, motion } from 'framer-motion';
import { DAYS_IN_WEEK } from 'config/constants';
import PropTypes from 'prop-types';
import { Row } from './styled';

function Grid({ date, renderDay }) {
  const [wrapperHeight, setWrapperHeight] = useState();

  const calculateWrapperHeight = useCallback((node) => {
    if (node) {
      setWrapperHeight(node.firstElementChild.clientHeight * 6);
    }
  }, []);

  const weeks = useMemo(() => {
    const firstMonthDayOffset = DAYS_IN_WEEK - 1 - date.startOf('month').day();

    return Array.from({ length: date.daysInMonth() }).reduce(
      (result, item, index) => {
        result[result.length - 1].push(index + 1);
        if (firstMonthDayOffset === index % DAYS_IN_WEEK) {
          result.push([]);
        }
        return result;
      },
      [[]]
    );
  }, [date]);

  return (
    <AnimateSharedLayout>
      <motion.div
        layout
        style={{ minHeight: wrapperHeight || 'auto' }}
        ref={calculateWrapperHeight}
      >
        {weeks.map((week, weekIndex) => (
          <Row key={weekIndex}>
            {week.map((day) => (
              <motion.div layout key={day}>
                {renderDay(date.clone().add(day - 1, 'days'))}
              </motion.div>
            ))}
          </Row>
        ))}
      </motion.div>
    </AnimateSharedLayout>
  );
}

Grid.propTypes = {
  date: PropTypes.object.isRequired,
  renderDay: PropTypes.func.isRequired,
};

export default Grid;
