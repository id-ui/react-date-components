import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { renderHeader } from 'testUtils';
import { TimeInput } from 'components/TimeInput';
import user from '@testing-library/user-event';

const renderTimeInput = (props) =>
  render(
    <TimeInput renderHeader={renderHeader} data-testid="input" {...props} />
  );

describe('TimeInput', () => {
  it('accessible', async () => {
    const { container } = render(
      <div>
        <label htmlFor="input">time</label>
        <TimeInput id="input" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('opens TimePicker on focus', async () => {
    const { getByTestId, getByRole } = renderTimeInput();
    const input = getByTestId('input');
    input.focus();
    await waitFor(() => {
      expect(getByRole('listbox')).toBeInTheDocument();
    });
  });

  it('does not open TimePicker if disabled', async () => {
    const { queryByRole, getByTestId } = renderTimeInput({
      disabled: true,
    });
    const input = getByTestId('input');
    input.focus();
    await waitFor(() => {
      expect(queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('calls onChange with entered date', async () => {
    const onChange = jest.fn();
    const outputFormat = 'HH:MM';
    const { getByTestId } = renderTimeInput({
      onChange,
      outputFormat,
    });
    const input = getByTestId('input');

    const value = '01:00';

    input.focus();
    user.type(input, value);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(value);
  });
});
