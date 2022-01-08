import { get } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export default ({ date, onChangePage, value: providedValue, onChange }) => {
  const [value, setValue] = useState(providedValue);

  useEffect(() => {
    setValue(providedValue);
  }, [providedValue]);

  const [draftRange, setDraftRange] = useState(null);

  useEffect(() => {
    const [startDate, endDate] = value;
    if (startDate && (!endDate || endDate.month() !== date.month())) {
      onChangePage(value[0].clone());
    }
    // eslint-disable-next-line
  }, [value]);

  const handleChange = useCallback(
    (newValue, force) => {
      if (!get(newValue, 0)) {
        return;
      }
      if (force || !newValue[0].isSame(newValue[1])) {
        setDraftRange(null);
        onChange(newValue);
      }
    },
    [onChange]
  );

  const handleMouseDown = useCallback(
    (e) => {
      if (draftRange) {
        return handleChange(draftRange, true);
      }

      const targetDay = parseInt(e.target.innerText, 10);

      const startOfNewRange = date.clone().set('date', targetDay);
      setDraftRange([startOfNewRange, startOfNewRange]);
    },
    [date, handleChange, draftRange]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!draftRange) {
        return;
      }

      const targetDay = parseInt(e.target.innerText, 10);

      const targetDate = date.clone().set('date', targetDay);
      setDraftRange(
        targetDate.isAfter(draftRange[0])
          ? [draftRange[0], targetDate]
          : [targetDate, draftRange[1]]
      );
    },
    [draftRange, date]
  );

  const handleMouseUp = useCallback(() => {
    handleChange(draftRange);
  }, [handleChange, draftRange]);

  return {
    value: draftRange || value,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
  };
};
