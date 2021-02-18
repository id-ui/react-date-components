import styled from 'styled-components';
import { prop } from 'styled-tools';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`;

export const MonthAndYear = styled.div`
  min-width: 160px;
  text-align: center;
  font-size: 18px;
  color: ${prop('color')};
`;
