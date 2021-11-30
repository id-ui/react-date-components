import React, { useCallback } from 'react';
import _ from 'lodash';
import guessMomentFormat from 'moment-guess';
import moment from 'moment';
import { TextInput } from '@idui/react-inputs';
import Icon from '@idui/react-icon';
import { validateStartOfDate } from 'helpers';

const getIconColor = (colors, { isDisabled, isActive }) => {
  if (isActive) {
    return colors.focused.border;
  }

  if (isDisabled) {
    colors.disabled.border;
  }

  return colors.default.border;
};

function Input(
  {
    type,
    outputFormat,
    maskPlaceholder,
    placeholder,
    rightAddon: providedRightAddon,
    disabled,
    isActive,
    colors: providedColors,
    onChange,
    ...props
  },
  ref
) {
  const validateDate = useCallback(
    (startOfDate) => validateStartOfDate(startOfDate, outputFormat),
    [outputFormat]
  );

  const mask = outputFormat.replace(/\w/g, '9')

  const setFocus = () => {
      ref.current?.focus();
  }

  const processPastedValue = useCallback(
    (pastedValue, e) => {
      if (type === 'time' || !_.isEmpty(e.target.value)) {
        return pastedValue;
      }

      try {
        const newValue = moment(pastedValue, guessMomentFormat(pastedValue));
        if (newValue.isValid()) {
          return newValue.format(outputFormat);
        }
      } catch {
        return pastedValue;
      }
    },
    [outputFormat, type]
  );

  const colors = { ...TextInput.defaultProps.colors, ...providedColors };

  const rightAddon = providedRightAddon || (
    <Icon
      name={type === 'date' ? 'calendar' : 'arrowDown'}
      size={type === 'date' ? '20px' : '14px'}
      color={getIconColor(colors, { isDisabled: disabled, isActive })}
      hoverColor={colors.focused.border}
      cursor="pointer"
      onClick={setFocus}
    />
  );

  return (
    <TextInput
      mask={mask}
      placeholder={placeholder || maskPlaceholder || outputFormat}
      maskPlaceholder={maskPlaceholder || outputFormat}
      ref={ref}
      validateMaskedValue={validateDate}
      disabled={disabled}
      rightAddon={rightAddon}
      fitWidthToMask
      onChange={onChange}
      processPastedValue={processPastedValue}
      colors={colors}
      {...props}
    />
  );
}

const InputWithRef = React.forwardRef(Input);

InputWithRef.defaultProps = {
  type: 'date',
};

export default React.memo(InputWithRef);
