import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Popover from '@idui/react-popover';
import { TimePicker } from 'components/TimePicker';
import Input from 'components/Input';

function TimeInput({
  value,
  onChange,
  options,
  timeSlot,
  isTimeDisabled,
  valueKey,
  labelKey,
  outputFormat,
  visibleOptionsCount,
  divider,
  renderOption,
  maskPlaceholder,
  placeholder,
  colors,
  ...inputProps
}) {
  const inputRef = useRef();

  const [isOpen, setOpen] = useState(false);

  const handleInputChange = useCallback(
    (newValue) => {
      onChange(newValue);
    },
    [onChange]
  );

  const handleFocus = useCallback(() => {
    if (!isOpen) {
      setOpen(true);
    }
  }, [isOpen]);

  const handleChangeOpen = useCallback((shouldOpen) => {
    if (!shouldOpen) {
      setOpen(shouldOpen);
    }
  }, []);

  return (
    <Popover
      content={
        <TimePicker
          outputFormat={outputFormat}
          value={value}
          onChange={onChange}
          options={options}
          timeSlot={timeSlot}
          isTimeDisabled={isTimeDisabled}
          valueKey={valueKey}
          labelKey={labelKey}
          visibleOptionsCount={visibleOptionsCount}
          divider={divider}
          renderOption={renderOption}
          colors={colors}
        />
      }
      placement="bottom"
      guessBetterPosition
      trigger="click"
      isOpen={isOpen}
      onChangeOpen={handleChangeOpen}
      closeOnEnter
      closeOnEscape
      closeOnTab
      lazy={false}
    >
      <Input
        type="time"
        value={value}
        onChange={handleInputChange}
        outputFormat={outputFormat}
        placeholder={placeholder}
        maskPlaceholder={maskPlaceholder}
        onFocus={handleFocus}
        ref={inputRef}
        isActive={isOpen}
        colors={colors.input}
        {...inputProps}
      />
    </Popover>
  );
}

TimeInput.propTypes = {
  ...TimePicker.propTypes,
  maskPlaceholder: PropTypes.string,
  placeholder: PropTypes.string,
};

TimeInput.defaultProps = {
  ...TimePicker.defaultProps,
  maskPlaceholder: '__:__',
};

export default TimeInput;
