import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

export const TimePart = styled.span`
  margin: 4px 0;
  width: 34px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  color: ${ifProp('withRedirect', '#d2d2d2', '#b4b4b4')};
  ${ifProp(
    'isSelected',
    css`
      font-size: 14px;
      ${TimePart} {
        &:first-child {
          background-color: #b787f1;
          color: #ffffff;
        }
        &:last-child {
          border: 1px solid #a569ed;
          color: #a569ed;
        }
      }
    `
  )}
`;

export const Divider = styled.span`
  margin: 0 7px;
`;
