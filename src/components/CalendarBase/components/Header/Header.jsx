import React from 'react';
import Icon from '@idui/react-icon';
import { Container, MonthAndYear } from './styled';

function Header({
  goToPreviousPage,
  goToNextPage,
  date,
  format,
  controlSize,
  color,
  hoverColor,
  className,
}) {
  return (
    <Container className={className}>
      <Icon
        name="back"
        cursor="pointer"
        size={controlSize}
        color={color}
        hoverColor={hoverColor}
        onClick={goToPreviousPage}
      />
      <MonthAndYear color={color}>
        <span>{date.format(format)}</span>
      </MonthAndYear>
      <Icon
        name="forward"
        cursor="pointer"
        size={controlSize}
        color={color}
        hoverColor={hoverColor}
        onClick={goToNextPage}
      />
    </Container>
  );
}

Header.defaultProps = {
  controlSize: '14px',
  color: '#A569ED',
  hoverColor: '#7546AE',
  format: 'MMMM YYYY',
};

export default Header;
