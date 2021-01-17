import styled from 'styled-components';
import { Day } from 'components/CalendarBase/styled';
import { DAY_STATES } from 'config/constants';
import { ifProp } from 'styled-tools';

export const DatePickerDay = styled(Day)`
  cursor: ${ifProp({ state: DAY_STATES.disabled }, 'not_allowed', 'pointer')};
`;
