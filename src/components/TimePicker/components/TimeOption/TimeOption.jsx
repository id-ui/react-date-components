import React from 'react';
import _ from 'lodash';
import { Divider, Container, TimePart } from './styled';

function TimeOption({
  data,
  isSelected,
  labelKey,
  divider,
  onClick,
  className,
}) {
  const itemLabel = _.get(data, labelKey);
  const isEmpty = itemLabel === '';

  const [hours, minutes] = itemLabel.split(divider);

  return (
    <Container
      isSelected={isSelected}
      onClick={onClick}
      className={className}
      role="option"
      aria-label={itemLabel}
    >
      <TimePart>{hours}</TimePart>
      <Divider>{!isEmpty && divider}</Divider>
      <TimePart>{minutes}</TimePart>
    </Container>
  );
}

export default TimeOption;
