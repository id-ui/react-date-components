import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Popover from '@idui/react-popover';
import { DatePicker } from 'components/DatePicker';
import Input from 'components/Input';

function DateInput({
  value,
  onChange,
  outputFormat,
  maskPlaceholder,
  placeholder,
  closeOnSelect,
  isDateDisabled,
  onChangePage,
  renderHeader,
  renderWeek,
  renderDay,
  headerFormat,
  ...inputProps
}) {
  const inputRef = useRef();

  const [isOpen, setOpen] = useState(false);

  const handleInputChange = useCallback(
    (newValue) => {
      const isValueDisabled = isDateDisabled(
        moment(newValue, outputFormat).startOf('day')
      );
      onChange(isValueDisabled ? value : newValue);
    },
    [onChange, isDateDisabled, outputFormat, value]
  );

  const handleFocus = useCallback(() => {
    if (!isOpen) {
      setOpen(true);
    }
  }, [isOpen]);

  const handleDatePickerChange = useCallback(
    (newValue) => {
      onChange(newValue);
      if (closeOnSelect) {
        setOpen(false);
      }
    },
    [onChange, closeOnSelect]
  );

  const handleChangeOpen = useCallback((shouldOpen) => {
    if (!shouldOpen) {
      setOpen(shouldOpen);
    }
  }, []);

  return (
    <Popover
      content={
        <DatePicker
          outputFormat={outputFormat}
          onChangePage={onChangePage}
          value={value}
          onChange={handleDatePickerChange}
          isDateDisabled={isDateDisabled}
          renderHeader={renderHeader}
          renderWeek={renderWeek}
          renderDay={renderDay}
          headerFormat={headerFormat}
        />
      }
      placement="bottom"
      guessBetterPosition
      trigger="click"
      isOpen={isOpen}
      onChangeOpen={handleChangeOpen}
      closeOnEnter
      closeOnEscape
      lazy={false}
    >
      <Input
        key="input"
        value={value}
        onChange={handleInputChange}
        outputFormat={outputFormat}
        placeholder={placeholder}
        maskPlaceholder={maskPlaceholder}
        onFocus={handleFocus}
        ref={inputRef}
        isActive={isOpen}
        {...inputProps}
      />
    </Popover>
  );
}

DateInput.propTypes = {
  ...DatePicker.propTypes,
  value: PropTypes.string,
  maskPlaceholder: PropTypes.string,
  placeholder: PropTypes.string,
  closeOnSelect: PropTypes.bool,
};

DateInput.defaultProps = {
  ...DatePicker.defaultProps,
  outputFormat: 'DD/MM/YYYY',
  closeOnSelect: true,
};

export default DateInput;
