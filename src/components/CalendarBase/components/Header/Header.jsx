import React from 'react';
import Icon from '@idui/react-icon';
import { Container, MonthAndYear } from './styled';

function Header({
  goToPreviousPage,
  goToNextPage,
  date,
  format,
  controlSize,
  colors,
  className,
}) {
  return (
    <Container className={className}>
      <Icon
        name="back"
        cursor="pointer"
        size={controlSize}
        color={colors.color}
        hoverColor={colors.hoverColor}
        onClick={goToPreviousPage}
      />
      <MonthAndYear color={colors.monthAndYear}>
        <span>{date.format(format)}</span>
      </MonthAndYear>
      <Icon
        name="forward"
        cursor="pointer"
        size={controlSize}
        color={colors.color}
        hoverColor={colors.hoverColor}
        onClick={goToNextPage}
      />
    </Container>
  );
}

Header.defaultProps = {
  controlSize: '14px',
  format: 'MMMM YYYY',
};

export default Header;
