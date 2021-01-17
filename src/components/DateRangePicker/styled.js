import styled, { css } from 'styled-components';
import { Day } from 'components/CalendarBase/styled';
import { ifProp } from 'styled-tools';

export const DatePickerDay = styled(Day)`
  cursor: pointer;

  ${ifProp(
    'isFirstInRange',
    css`
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
    `
  )}

  ${ifProp(
    'isLastInRange',
    css`
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
    `
  )}
`;
