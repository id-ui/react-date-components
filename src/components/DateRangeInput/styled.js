import styled from 'styled-components';
import { prop } from 'styled-tools';

export const InputsWrapper = styled.div`
  display: flex;
  & > * {
    width: 164px;
    input {
      width: 90px;
    }
    &:first-child {
      margin-right: 40px;
    }
  }
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 22px;
    height: 2px;
    transform: translate(-50%, -50%);
    background-color: ${prop('colors.default.border')};
    transition: background-color 0.3s ease-in-out;
  }
  &:focus-within {
    &:after {
      background-color: ${prop('colors.focused.border')};
    }
  }
`;
