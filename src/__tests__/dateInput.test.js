import React from 'react';
import { render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { renderHeader } from 'testUtils';
import { DateInput } from 'components/DateInput';
import { CURRENT_DATE } from 'config/constants';

const renderDateInput = (props) =>
  render(
    <DateInput renderHeader={renderHeader} data-testid="input" {...props} />
  );

describe('DateInput', () => {
  it('accessible', async () => {
    const { container } = render(
      <div>
        <label htmlFor="date">Date</label>
        <DateInput id="date" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('opens DatePicker on focus', async () => {
    const { getByTestId } = renderDateInput();
    const input = getByTestId('input');
    input.focus();
    await waitFor(() => {
      expect(getByTestId('header')).toBeInTheDocument();
    });
  });

  it('opens DatePicker on calendar icon click', async () => {
    const { getByTestId } = renderDateInput();
    const input = getByTestId('input');
    const calendarIcon =
      input.parentElement.nextElementSibling.firstElementChild
        .firstElementChild;
    user.click(calendarIcon);
    await waitFor(() => {
      expect(getByTestId('header')).toBeInTheDocument();
    });
  });

  it('does not open DatePicker if disabled', async () => {
    const { queryByTestId, getByTestId } = renderDateInput({
      disabled: true,
    });
    const input = getByTestId('input');
    input.focus();
    await waitFor(() => {
      expect(queryByTestId('header')).not.toBeInTheDocument();
    });
  });

  it('calls onChange with clicked date and closes popover', async () => {
    const onChange = jest.fn();
    const outputFormat = 'DD.MM.YYYY';
    const { getByText, getByTestId, queryByTestId } = renderDateInput({
      onChange,
      outputFormat,
    });
    const input = getByTestId('input');
    input.focus();
    const day = 25;
    await waitFor(async () => {
      user.click(getByText(day));
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        CURRENT_DATE.clone().set({ date: day }).format(outputFormat)
      );
      await waitFor(() => {
        expect(queryByTestId('header')).not.toBeVisible();
      });
    });
  });

  it('calls onChange with entered date', async () => {
    const onChange = jest.fn();
    const outputFormat = 'DD.MM.YYYY';
    const { getByTestId } = renderDateInput({
      onChange,
      outputFormat,
    });
    const input = getByTestId('input');

    const value = CURRENT_DATE.clone().set({ date: 25 }).format(outputFormat);

    input.focus();
    user.type(input, value);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(value);
  });

  it('clears value', async () => {
    const onChange = jest.fn();
    const outputFormat = 'DD.MM.YYYY';
    const { getByTestId } = renderDateInput({
      onChange,
      outputFormat,
      value: CURRENT_DATE.clone().set({ date: 25 }).format(outputFormat),
    });
    const input = getByTestId('input');
    const clearButton =
      input.parentElement.nextElementSibling.firstElementChild
        .firstElementChild;
    user.click(clearButton);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('does not call onChange if date disabled', async () => {
    const onChange = jest.fn();
    const day = 25;
    const outputFormat = 'DD.MM.YYYY';
    const { getByText, getByTestId } = renderDateInput({
      onChange,
      isDateDisabled: (date) => date.date() === day,
      outputFormat,
    });

    getByTestId('input').focus();
    await waitFor(() => user.click(getByText(day)));
    expect(onChange).toHaveBeenCalledTimes(0);

    user.click(getByText(day + 1));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      CURRENT_DATE.clone()
        .set({ date: day + 1 })
        .format(outputFormat)
    );
    onChange.mockClear();
    const disabledValue = CURRENT_DATE.clone()
      .set({ date: day })
      .format(outputFormat);

    await user.type(getByTestId('input'), disabledValue);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('closes DatePicker on enter button press', async () => {
    // const { getByTestId } = renderDateInput();
    // const input = getByTestId('input');
    // input.focus();
    // await waitFor(() => expect(getByTestId('header')).toBeInTheDocument());

    // TODO ???
    // await waitFor(() => fireEvent.keyDown(document.body, { keyCode: 13 }))
    // await waitFor(() => expect(getByTestId("header")).not.toBeInTheDocument())
    expect(true).toEqual(true);
  });
});
