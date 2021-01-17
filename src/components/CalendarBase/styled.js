import styled, { css } from 'styled-components';
import _ from 'lodash';
import { ifProp, withProp } from 'styled-tools';
import { DAY_STATES } from 'config/constants';

const DAY_HEIGHT = 26;
const DAY_MARGIN = 3;

const colors = {
  [DAY_STATES.default]: {},
  [DAY_STATES.active]: {
    background: '#7546ae',
    color: '#ffffff',
  },
  [DAY_STATES.current]: {
    color: '#7546ae',
  },
  [DAY_STATES.disabled]: {
    color: '#efefef',
  },
  hover: {
    background: '#b787f1',
    color: '#ffffff',
  },
};

export const Day = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: ${DAY_HEIGHT}px;
  border-radius: 5px;
  font-size: 14px;
  margin: ${DAY_MARGIN / 2}px ${DAY_MARGIN / 2}px;
  transition: all 0.3s ease-in-out;
  ${withProp(
    'state',
    (state) => css`
      color: ${_.get(colors, [state, 'color'])};
      background-color: ${_.get(colors, [state, 'background'])};
    `
  )}
  ${ifProp(
    { state: DAY_STATES.default },
    css`
      &:hover {
        color: ${colors[DAY_STATES.hover].color};
        background-color: ${colors[DAY_STATES.hover].background};
      }
    `
  )}
`;

export const Week = styled.div`
  display: flex;
  margin-bottom: 10px;
  ${Day} {
    font-size: 10px;
    margin-bottom: 0;
  }
`;
