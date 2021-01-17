import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
export const renderHeader = ({
  date,
  format,
  goToPreviousPage,
  goToNextPage,
}) => (
  <div>
    <span onClick={goToPreviousPage} data-testid="control">
      {'<'}
    </span>
    <span data-testid="header">{date.format(format)}</span>
    <span onClick={goToNextPage} data-testid="control">
      {'>'}
    </span>
  </div>
);
/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

export const selectRange = async (
  [firstDay, lastDay],
  getByText,
  shouldHoldMouse = true
) => {
  await waitFor(() => {
    fireEvent.mouseDown(getByText(firstDay), {
      target: {
        innerText: firstDay,
      },
    });
  });

  await waitFor(() => {
    fireEvent.mouseMove(getByText(lastDay), {
      target: {
        innerText: lastDay,
      },
    });
  });

  await waitFor(() => {
    if (shouldHoldMouse) {
      fireEvent.mouseUp(getByText(lastDay), {
        target: {
          innerText: lastDay,
        },
      });
    } else {
      fireEvent.mouseDown(getByText(lastDay), {
        target: {
          innerText: lastDay,
        },
      });
    }
  });
};
