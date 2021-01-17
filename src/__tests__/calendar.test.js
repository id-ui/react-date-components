import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Calendar } from 'components/Calendar';
import { renderHeader } from 'testUtils';
import { CURRENT_DATE } from 'config/constants';
import { CalendarBase } from 'components/CalendarBase';

const renderCalendar = (props) =>
  render(<Calendar renderHeader={renderHeader} {...props} />);

describe('Calendar', () => {
  it('accessible', async () => {
    const { container } = renderCalendar();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('opens current month page on init and changes page on left/right control click', () => {
    const { getByTestId, getAllByTestId } = renderCalendar();
    const header = getByTestId('header');
    const controls = getAllByTestId('control');
    expect(header).toHaveTextContent(
      CURRENT_DATE.format(CalendarBase.defaultProps.headerFormat)
    );
    user.click(controls[0]);
    expect(header).toHaveTextContent(
      CURRENT_DATE.clone()
        .subtract(1, 'months')
        .format(CalendarBase.defaultProps.headerFormat)
    );
    user.click(controls[1]);
    expect(header).toHaveTextContent(
      CURRENT_DATE.format(CalendarBase.defaultProps.headerFormat)
    );
  });

  it('renders all month days', () => {
    const { getByText, queryByText } = renderCalendar();
    const lastMonthDay = CURRENT_DATE.clone().endOf('month').date();
    expect(getByText(1)).toBeInTheDocument();
    expect(getByText(lastMonthDay)).toBeInTheDocument();
    expect(queryByText(lastMonthDay + 1)).not.toBeInTheDocument();
  });
});
