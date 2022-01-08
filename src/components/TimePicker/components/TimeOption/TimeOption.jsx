import React from 'react';
import { get } from 'lodash';
import { Divider, Container, TimePart } from './styled';

function TimeOption({
  data,
  isSelected,
  labelKey,
  divider,
  onClick,
  className,
  withRedirect,
  colors,
}) {
  const itemLabel = get(data, labelKey);
  const isEmpty = itemLabel === '';

  const [hours, minutes] = itemLabel.split(divider);

  return (
    <Container
      isSelected={isSelected}
      onClick={onClick}
      className={className}
      role="option"
      aria-label={itemLabel}
      withRedirect={withRedirect}
      colors={colors}
    >
      <TimePart>{hours}</TimePart>
      <Divider>{!isEmpty && divider}</Divider>
      <TimePart>{minutes}</TimePart>
    </Container>
  );
}

export default TimeOption;
