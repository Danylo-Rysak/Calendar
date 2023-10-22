import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const CalendarCells = styled('div')`
  width: 230px;
  height: 320px;
  background: cornsilk;
`;

export const Header = styled('div')<{ isCurrentDay: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  ${({ isCurrentDay }) =>
    isCurrentDay
      ? css`
          background: mediumaquamarine;
        `
      : css`
          background: khaki;
        `}
`;

export const AddTask = styled('img')`
  width: 22px;
  height: 22px;
  cursor: pointer;
`;

export const HolidayName = styled('p')`
  font-size: 22px;
  text-align: center;
  color: red;
`;
