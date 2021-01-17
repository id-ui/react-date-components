import React from 'react';
import { render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { renderHeader, selectRange } from 'testUtils';
import { DateRangeInput } from 'components/DateRangeInput';
import { CURRENT_DATE } from 'config/constants';

const renderDateRangeInput = (props) => {
  const { rerender, ...renderProps } = render(
    <DateRangeInput
      data-testid="input"
      renderHeader={renderHeader}
      {...props}
    />
  );
  return {
    rerender: (updatedProps) =>
      rerender(
        <DateRangeInput
          data-testid="input"
          renderHeader={renderHeader}
          {...updatedProps}
        />
      ),
    ...renderProps,
  };
};

describe('DateRangeInput', () => {
  it('accessible', async () => {
    const { container } = render(
      <div>
        <label htmlFor="date[0]">Start</label>
        <label htmlFor="date[1]">End</label>
        <DateRangeInput id="date" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('opens DateRangePicker on any DateRangeInput input focus', async () => {
    const { getAllByTestId, getByTestId } = renderDateRangeInput();
    const inputs = getAllByTestId('input');
    inputs[0].focus();
    await waitFor(() => {
      expect(getByTestId('header')).toBeInTheDocument();
    });
  });

  it('does not open DatePicker if disabled', async () => {
    const { queryByTestId, getAllByTestId } = renderDateRangeInput({
      disabled: true,
    });
    const inputs = getAllByTestId('input');
    inputs[0].focus();
    await waitFor(() => {
      expect(queryByTestId('header')).not.toBeInTheDocument();
    });
  });

  it('calls onChange with selected range', async () => {
    const onChange = jest.fn();
    const outputFormat = 'DD.MM.YYYY';
    const { getByText, getAllByTestId } = renderDateRangeInput({
      onChange,
      outputFormat,
    });
    const inputs = getAllByTestId('input');
    inputs[1].focus();

    const range = [5, 25];

    await selectRange(range, getByText);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      range.map((day) =>
        CURRENT_DATE.clone().set({ date: day }).format(outputFormat)
      )
    );
  });

  it('calls onChange with entered range', async () => {
    const onChange = jest.fn();
    const outputFormat = 'DD.MM.YYYY';
    const { getAllByTestId, rerender } = renderDateRangeInput({
      onChange,
      outputFormat,
    });

    const range = [5, 25];
    const values = range.map((day) =>
      CURRENT_DATE.clone().set({ date: day }).format(outputFormat)
    );

    const inputs = getAllByTestId('input');
    inputs[0].focus();
    await user.type(inputs[0], values[0]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([values[0], '']);

    rerender({
      value: [values[0], ''],
      onChange,
      outputFormat,
    });

    onChange.mockClear();

    await user.type(inputs[1], values[1]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(values);
  });

  it('clears value', async () => {
    const onChange = jest.fn();
    const outputFormat = 'DD.MM.YYYY';
    const value = [5, 25].map((day) =>
      CURRENT_DATE.clone().set({ date: day }).format(outputFormat)
    );
    const { getAllByTestId } = renderDateRangeInput({
      onChange,
      outputFormat,
      value,
    });
    let inputs = getAllByTestId('input');
    const firstClearButton =
      inputs[0].parentElement.nextElementSibling.firstElementChild
        .firstElementChild;
    user.click(firstClearButton);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['', value[1]]);

    onChange.mockClear();

    inputs = getAllByTestId('input');
    const secondClearButton =
      inputs[1].parentElement.nextElementSibling.firstElementChild
        .firstElementChild;
    user.click(secondClearButton);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([value[0], '']);
  });

  it('does not call onChange if date disabled', async () => {
    const onChange = jest.fn();
    const range = [5, 25];
    const outputFormat = 'DD.MM.YYYY';
    const { getByText, getAllByTestId } = renderDateRangeInput({
      onChange,
      isDateDisabled: (date) => date.date() === range[0],
      outputFormat,
    });

    const inputs = getAllByTestId('input');
    inputs[0].focus();
    await selectRange(range, getByText);
    expect(onChange).toHaveBeenCalledTimes(0);

    onChange.mockClear();

    const disabledValue = CURRENT_DATE.clone()
      .set({ date: range[0] })
      .format(outputFormat);

    user.type(inputs[0], disabledValue);
    // TODO : 1 time without waiting after clear value on disabled fix
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][0]).toEqual(['', '']);
    });
  });
});
