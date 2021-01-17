import React, { useCallback, useMemo } from 'react';
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
    ...props
  },
  ref
) {
  const validateDate = useCallback(
    (startOfDate) => validateStartOfDate(startOfDate, outputFormat),
    [outputFormat]
  );

  const mask = useMemo(() => outputFormat.replace(/\w/g, '9'), [outputFormat]);

  const setFocus = useCallback(() => {
    ref.current?.focus();
  }, [ref]);

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
      {...props}
    />
  );
}

const InputWithRef = React.forwardRef(Input);

InputWithRef.defaultProps = {
  type: 'date',
};

export default InputWithRef;
