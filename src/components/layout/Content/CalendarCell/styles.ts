import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const CalendarCells = styled('div')`
  width: 230px;
  min-height: 320px;
  height: auto;
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

export const AddTaskButton = styled('button')`
  background: none;
  border: none;
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
`;

export const AddTask = styled('img')`
  width: 22px;
  height: 22px;
`;

export const HolidayName = styled('p')`
  margin-top: 30px;
  font-size: 22px;
  text-align: center;
  padding: 0 20px;
  color: red;
`;

export const Content = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
`;
