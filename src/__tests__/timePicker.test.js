import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { renderHeader } from 'testUtils';
import { TimePicker } from 'components/TimePicker';

const timeOptions = Array.from({ length: 9 }, (a, b) => ({
  value: `0${b}:00`,
  label: `0${b}:00`,
}));

const VISIBLE_OPTIONS_COUNT = 7;
const MENU_HEIGHT = 500;
const OPTION_HEIGHT = MENU_HEIGHT / VISIBLE_OPTIONS_COUNT;

const renderTimePicker = (props) =>
  render(
    <TimePicker
      renderHeader={renderHeader}
      visibleOptionsCount={VISIBLE_OPTIONS_COUNT}
      {...props}
    />
  );

const mockScrollTo = (container) => {
  const scrollTo = jest.fn();
  container.scrollTo = scrollTo;
  return scrollTo;
};

const setDimensions = (container) => {
  Object.defineProperty(container, 'clientHeight', {
    configurable: true,
    value: MENU_HEIGHT,
  });
  Object.defineProperty(container.firstElementChild, 'clientHeight', {
    configurable: true,
    value: OPTION_HEIGHT,
  });
};

describe('TimePicker', () => {
  it('accessible', async () => {
    const { container } = renderTimePicker();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('scrolls to clicked time', async () => {
    const { getAllByRole } = renderTimePicker({
      options: timeOptions,
    });
    const optionElements = getAllByRole('option');
    const container = optionElements[0].parentElement;

    setDimensions(container);
    const scrollTo = mockScrollTo(container);

    await waitFor(() => user.click(optionElements[6]));

    expect(scrollTo).toHaveBeenCalledTimes(1);
    expect(scrollTo).toHaveBeenCalledWith(0, OPTION_HEIGHT * 3);
  });

  it('calls onChange on scroll', async () => {
    const onChange = jest.fn();
    const { getAllByRole } = renderTimePicker({
      onChange,
      options: timeOptions,
    });
    const options = getAllByRole('option');
    const container = options[0].parentElement;

    setDimensions(container);

    Object.defineProperty(container, 'scrollTop', {
      configurable: true,
      value: OPTION_HEIGHT * 3,
    });
    fireEvent.scroll(container);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(timeOptions[3].value);
  });
});
