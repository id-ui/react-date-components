import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { renderHeader, selectRange } from 'testUtils';
import { DateRangePicker } from 'components/DateRangePicker';
import { CURRENT_DATE } from 'config/constants';
import { CalendarBase } from 'components/CalendarBase';

const renderDateRangePicker = (props) => {
  const { rerender, ...renderProps } = render(
    <DateRangePicker renderHeader={renderHeader} {...props} />
  );
  return {
    rerender: (updatedProps) =>
      rerender(
        <DateRangePicker renderHeader={renderHeader} {...updatedProps} />
      ),
    ...renderProps,
  };
};

describe('DateRangePicker', () => {
  it('accessible', async () => {
    const { container } = renderDateRangePicker();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('calls onChange with selected range as Moment objects', async () => {
    const onChange = jest.fn();
    const { getByText } = renderDateRangePicker({
      onChange,
    });
    const range = [5, 25];

    await selectRange(range, getByText);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      range.map((day) => CURRENT_DATE.clone().set({ date: day }))
    );
  });

  it('calls onChange with clicked date as string', async () => {
    const onChange = jest.fn();
    const outputFormat = 'DD.MM.YYYY';
    const { getByText } = renderDateRangePicker({
      onChange,
      outputFormat,
    });
    const range = [5, 25];

    await selectRange(range, getByText, false);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      range.map((day) =>
        CURRENT_DATE.clone().set({ date: day }).format(outputFormat)
      )
    );
  });

  it('selects range without holding mouse', async () => {
    const onChange = jest.fn();
    const { getByText } = renderDateRangePicker({
      onChange,
    });
    const range = [5, 25];

    await selectRange(range, getByText);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      range.map((day) => CURRENT_DATE.clone().set({ date: day }))
    );
  });

  it('does not starts selecting range if first date disabled', async () => {
    const onChange = jest.fn();
    const firstDay = 5;
    const { getByText } = renderDateRangePicker({
      onChange,
      isDateDisabled: (date) => date.date() === firstDay,
    });

    const range = [firstDay, 25];

    await selectRange(range, getByText);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('opens first range date on init and changes page to firstDate month on external range change', () => {
    let range = [
      CURRENT_DATE.clone().set({ month: 1 }),
      CURRENT_DATE.clone().set({ month: 12 }),
    ];
    const { getByTestId, rerender } = renderDateRangePicker({
      value: range,
    });

    const header = getByTestId('header');
    expect(header).toHaveTextContent(
      range[0].format(CalendarBase.defaultProps.headerFormat)
    );

    range = [
      CURRENT_DATE.clone().set({ month: 5 }),
      CURRENT_DATE.clone().set({ month: 7 }),
    ];
    rerender({
      value: range,
    });
    expect(header).toHaveTextContent(
      range[0].format(CalendarBase.defaultProps.headerFormat)
    );
  });
});
