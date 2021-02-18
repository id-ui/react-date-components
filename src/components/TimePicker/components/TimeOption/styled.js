import styled, { css } from 'styled-components';
import { ifProp, withProp } from 'styled-tools';

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
  ${withProp('colors', (colors) =>
    colors
      ? css`
          color: ${ifProp(
            'withRedirect',
            colors.disabled.color,
            colors.default.color
          )};
          ${ifProp(
            'isSelected',
            css`
              font-size: 14px;
              ${TimePart} {
                &:first-child {
                  background-color: ${colors.active.background};
                  color: ${colors.active.color};
                }
                &:last-child {
                  border: 1px solid ${colors.active.background};
                  color: ${colors.active.background};
                }
              }
            `
          )}
        `
      : ''
  )}
`;

export const Divider = styled.span`
  margin: 0 7px;
`;
