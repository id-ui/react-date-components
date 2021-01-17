import React, { useCallback, useMemo, useRef } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Container } from './styled';
import { getTimeOptions } from './helpers';
import TimeOption from './components/TimeOption';

function TimePicker({
  options: providedOptions,
  timeSlot,
  value,
  onChange,
  isTimeDisabled,
  valueKey,
  labelKey,
  outputFormat,
  visibleOptionsCount,
  divider,
  renderOption,
  emptyOptionPlaceholder,
  className,
}) {
  const containerRef = useRef();

  const handleContainerRef = useCallback(
    (node) => {
      containerRef.current = node;
      if (node) {
        const childHeight = node.firstElementChild?.clientHeight;
        if (childHeight) {
          node.style.height = `${childHeight * visibleOptionsCount}px`;
        }
      }
    },
    [visibleOptionsCount]
  );

  const options = useMemo(() => {
    const allOptions =
      providedOptions ||
      getTimeOptions({
        timeSlot,
        valueKey,
        labelKey,
        format: `HH${divider}mm`,
        outputFormat,
      });
    const filteredOptions = _.reject(allOptions, isTimeDisabled);

    const emptyOptions = Array.from(
      { length: visibleOptionsCount - 1 },
      (_, index) => ({
        [valueKey]: index,
        [labelKey]: emptyOptionPlaceholder || `--${divider}--`,
      })
    );

    const optionsBeforeActiveCount = Math.floor(visibleOptionsCount / 2);

    return [
      ...emptyOptions.slice(0, optionsBeforeActiveCount),
      ...filteredOptions,
      ...emptyOptions.slice(optionsBeforeActiveCount),
    ];
  }, [
    providedOptions,
    isTimeDisabled,
    visibleOptionsCount,
    divider,
    labelKey,
    valueKey,
    outputFormat,
    timeSlot,
    emptyOptionPlaceholder,
  ]);

  const handleScroll = useCallback(
    (e) => {
      const { scrollTop, clientHeight } = e.target;
      const childHeight = e.target.firstElementChild.clientHeight;
      const newActiveElementIndex = Math.floor(
        (scrollTop + clientHeight / 2) / childHeight
      );
      const newValue = _.get(options[newActiveElementIndex], valueKey);
      if (value !== newValue) {
        onChange(newValue);
      }
    },
    [valueKey, value, onChange, options]
  );

  const handleTimeItemClick = useCallback((index) => {
    const {
      firstElementChild: { clientHeight: childHeight },
      clientHeight: containerHeight,
    } = containerRef.current;
    containerRef.current.scrollTo(
      0,
      childHeight * (index + 0.5) - containerHeight / 2
    );
  }, []);

  return (
    <Container
      onScroll={handleScroll}
      ref={handleContainerRef}
      role="listbox"
      aria-label="select time"
      className={className}
    >
      {options.map((option, index) =>
        renderOption({
          key: `${index}-${_.get(option, valueKey)}`,
          isSelected: value === _.get(option, valueKey),
          onClick: () => handleTimeItemClick(index),
          data: option,
          valueKey,
          labelKey,
          divider,
        })
      )}
    </Container>
  );
}

TimePicker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  timeSlot: PropTypes.number,
  outputFormat: PropTypes.string,
  value: PropTypes.string,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  onChange: PropTypes.func,
  isTimeDisabled: PropTypes.func,
  visibleOptionsCount: PropTypes.number,
  divider: PropTypes.string,
  renderOption: PropTypes.func,
  emptyOptionPlaceholder: PropTypes.string,
  className: PropTypes.string,
};

TimePicker.defaultProps = {
  timeSlot: 60,
  onChange: _.noop,
  isTimeDisabled: _.constant(false),
  valueKey: 'value',
  labelKey: 'label',
  outputFormat: 'HH:mm',
  divider: ':',
  visibleOptionsCount: 7,
  renderOption: (props) => <TimeOption {...props} />,
};

export default TimePicker;
