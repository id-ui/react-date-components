import React, { useCallback, useMemo, useRef } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Container } from './styled';
import { getTimeOptions } from './helpers';
import TimeOption from './components/TimeOption';

const markOptionWithRedirect = (option) => ({
  ...option,
  withRedirect: true,
});

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
  className,
  showDefaultSelectionIfNoValue,
  defaultSelectedValue,
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
        divider,
        outputFormat,
      });

    const optionsBeforeActiveCount = Math.floor(visibleOptionsCount / 2);

    const filteredOptions = _.reject(allOptions, isTimeDisabled).map(
      (option, index) => ({
        ...option,
        index: optionsBeforeActiveCount + index,
      })
    );

    return [
      ...filteredOptions
        .slice(
          filteredOptions.length - optionsBeforeActiveCount - 1,
          filteredOptions.length - 1
        )
        .map(markOptionWithRedirect),
      ...filteredOptions,
      ...filteredOptions
        .slice(1, optionsBeforeActiveCount + 1)
        .map(markOptionWithRedirect),
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

  const selectedValue =
    _.isEmpty(value) && showDefaultSelectionIfNoValue
      ? defaultSelectedValue ||
        options[Math.floor(visibleOptionsCount / 2)].value
      : value;

  return (
    <Container
      onScroll={handleScroll}
      ref={handleContainerRef}
      role="listbox"
      aria-label="select time"
      className={className}
    >
      {options.map((option, index) => {
        const optionValue = _.get(option, valueKey);
        return renderOption({
          key: `${index}-${optionValue}-${option.withRedirect}`,
          isSelected: selectedValue === optionValue,
          onClick: _.isUndefined(option.index)
            ? undefined
            : () => handleTimeItemClick(option.index),
          data: option,
          valueKey,
          labelKey,
          divider,
          withRedirect: option.withRedirect,
        });
      })}
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
  className: PropTypes.string,
  showDefaultSelectionIfNoValue: PropTypes.bool,
  defaultSelectedValue: PropTypes.string,
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
  showDefaultSelectionIfNoValue: true,
};

export default TimePicker;
