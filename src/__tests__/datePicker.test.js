import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { renderHeader } from 'testUtils';
import { DatePicker } from 'components/DatePicker';
import { CURRENT_DATE } from 'config/constants';
import { CalendarBase } from '../components/CalendarBase';

const renderDatePicker = (props) =>
  render(<DatePicker renderHeader={renderHeader} {...props} />);

describe('DatePicker', () => {
  it('accessible', async () => {
    const { container } = renderDatePicker();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('calls onChangePage when page changed', () => {
    const { getByTestId, getAllByTestId } = renderDatePicker();
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

  it('calls onChange with clicked date as Moment object', () => {
    const onChange = jest.fn();
    const { getByText } = renderDatePicker({
      onChange,
    });
    const day = 25;
    user.click(getByText(day));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      CURRENT_DATE.clone().set({ date: day })
    );
  });

  it('calls onChange with clicked date as string', () => {
    const onChange = jest.fn();
    const outputFormat = 'DD.MM.YYYY';
    const { getByText } = renderDatePicker({
      onChange,
      outputFormat,
    });
    const day = 25;
    user.click(getByText(day));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      CURRENT_DATE.clone().set({ date: day }).format(outputFormat)
    );
  });

  it('does not call onChange if date disabled', () => {
    const onChange = jest.fn();
    const day = 25;
    const { getByText } = renderDatePicker({
      onChange,
      isDateDisabled: (date) => date.date() === day,
    });

    user.click(getByText(day));
    expect(onChange).toHaveBeenCalledTimes(0);

    user.click(getByText(day + 1));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      CURRENT_DATE.clone().set({ date: day + 1 })
    );
  });
});
