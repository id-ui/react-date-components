import React, { useCallback, useRef, useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import Popover from '@idui/react-popover';
import { DateRangePicker } from 'components/DateRangePicker';
import Input from 'components/Input';
import { TextInput } from '@idui/react-inputs';
import { InputsWrapper } from './styled';

const INPUT_INDEXES = {
  start: '0',
  end: '1',
};

function DateRangeInput({
  value,
  onChange,
  outputFormat,
  maskPlaceholder,
  placeholder,
  closeOnSelect,
  className,
  name,
  id,
  tabIndex,
  isDateDisabled,
  onChangePage,
  renderHeader,
  renderWeek,
  renderDay,
  headerFormat,
  colors: providedColors,
  ...inputProps
}) {
  const startOfRangeInputRef = useRef();
  const endOfRangeInputRef = useRef();

  const [isOpen, setOpen] = useState(false);
  const [activeInputIndex, setActiveInputIndex] = useState(INPUT_INDEXES.start);

  const handleStartOfRangeInputChange = useCallback(
    (newLeftInputValue) => {
      if (newLeftInputValue === _.get(value, 0, '')) {
        return;
      }
      const isValueDisabled =
        newLeftInputValue &&
        isDateDisabled(moment(newLeftInputValue, outputFormat).startOf('day'));
      if (isValueDisabled) {
        // TODO: clear value not working without it.. replace block to onChange(['',  _.get(value, INPUT_INDEXES.end, '')]) after fix
        onChange([newLeftInputValue, _.get(value, INPUT_INDEXES.end, '')]);
        setTimeout(() => {
          onChange(['', _.get(value, INPUT_INDEXES.end, '')]);
        }, 0);
        // TODO: end
      } else {
        onChange([newLeftInputValue, _.get(value, INPUT_INDEXES.end, '')]);
        if (newLeftInputValue) {
          endOfRangeInputRef.current?.focus();
        }
      }
    },
    [onChange, value, isDateDisabled, outputFormat]
  );

  const handleEndOfRangeInputChange = useCallback(
    (newRightInputValue) => {
      if (newRightInputValue === _.get(value, 1, '')) {
        return;
      }
      const isValueDisabled = isDateDisabled(
        moment(newRightInputValue, outputFormat).startOf('day')
      );
      onChange([
        _.get(value, INPUT_INDEXES.start, ''),
        isValueDisabled ? '' : newRightInputValue,
      ]);
    },
    [onChange, value, isDateDisabled, outputFormat]
  );

  const handleFocus = useCallback(
    (e) => {
      const index = e.target.getAttribute('data-index');
      setActiveInputIndex(index);
      if (!isOpen) {
        setOpen(true);
      }
    },
    [isOpen]
  );

  const handleDateRangePickerChange = useCallback(
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

  const colors = { ...TextInput.defaultProps.colors, ...providedColors };

  return (
    <Popover
      content={
        <DateRangePicker
          onChangePage={onChangePage}
          outputFormat={outputFormat}
          value={value}
          onChange={handleDateRangePickerChange}
          isDateDisabled={isDateDisabled}
          renderHeader={renderHeader}
          renderWeek={renderWeek}
          renderDay={renderDay}
          headerFormat={headerFormat}
        />
      }
      placement={
        activeInputIndex === INPUT_INDEXES.start ? 'bottomLeft' : 'bottomRight'
      }
      guessBetterPosition
      trigger="click"
      isOpen={isOpen}
      onChangeOpen={handleChangeOpen}
      closeOnEnter
      closeOnEscape
      lazy={false}
    >
      <InputsWrapper colors={colors} className={className}>
        <Input
          key={INPUT_INDEXES.start}
          value={_.get(value, 0, '')}
          onChange={handleStartOfRangeInputChange}
          outputFormat={outputFormat}
          placeholder={placeholder}
          maskPlaceholder={maskPlaceholder}
          onFocus={handleFocus}
          ref={startOfRangeInputRef}
          data-index={INPUT_INDEXES.start}
          isActive={isOpen}
          id={id ? `${id}[0]` : undefined}
          name={name ? `${name}[0]` : undefined}
          tabIndex={tabIndex || undefined}
          colors={colors}
          {...inputProps}
        />
        <Input
          key={INPUT_INDEXES.end}
          value={_.get(value, 1, '')}
          onChange={handleEndOfRangeInputChange}
          outputFormat={outputFormat}
          placeholder={placeholder}
          maskPlaceholder={maskPlaceholder}
          onFocus={handleFocus}
          ref={endOfRangeInputRef}
          data-index={INPUT_INDEXES.end}
          isActive={isOpen}
          id={id ? `${id}[1]` : undefined}
          name={name ? `${name}[1]` : undefined}
          tabIndex={tabIndex ? tabIndex + 1 : undefined}
          colors={colors}
          {...inputProps}
        />
      </InputsWrapper>
    </Popover>
  );
}

DateRangeInput.propTypes = {
  ...DateRangePicker.propTypes,
  value: PropTypes.arrayOf(PropTypes.string),
  maskPlaceholder: PropTypes.string,
  placeholder: PropTypes.string,
  closeOnSelect: PropTypes.bool,
};

DateRangeInput.defaultProps = {
  ...DateRangePicker.defaultProps,
  outputFormat: 'DD/MM/YYYY',
  closeOnSelect: true,
};

export default DateRangeInput;
