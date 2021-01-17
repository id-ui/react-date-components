import React, { useCallback, useMemo } from 'react';
import { formatMoment, toMoment } from 'helpers';

export default (Component) => {
  return ({ value, outputFormat, onChange, ...props }) => {
    const formattedValue = useMemo(
      () => (value || []).map(toMoment(outputFormat)),
      [value, outputFormat]
    );

    const handleChange = useCallback(
      (newValue) => {
        if (!newValue) {
          return;
        }
        onChange(
          outputFormat ? newValue.map(formatMoment(outputFormat)) : newValue
        );
      },
      [onChange, outputFormat]
    );

    return (
      <Component {...props} value={formattedValue} onChange={handleChange} />
    );
  };
};
