import React, { useCallback, useMemo } from 'react';
import { formatMoment, toMoment } from 'helpers';

export default (Component) => {
  return ({ value, outputFormat, onChange, ...props }) => {
    const formattedValue = useMemo(() => toMoment(outputFormat)(value), [
      value,
      outputFormat,
    ]);

    const handleChange = useCallback(
      (newValue) => {
        onChange(
          outputFormat ? formatMoment(outputFormat)(newValue) : newValue
        );
      },
      [onChange, outputFormat]
    );

    return (
      <Component {...props} value={formattedValue} onChange={handleChange} />
    );
  };
};
