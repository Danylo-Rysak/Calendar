import styled from '@emotion/styled';

export const TaskItem = styled('div')`
  display: flex;
  height: 88px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: #f9d370;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
`;

export const TaskColor = styled('div')<{ color: string }>`
  background: ${({ color }) => color};
  width: 30px;
  height: 15px;
  border-radius: 20px;
`;

export const Label = styled('p')`
  margin: 0;
`;

export const ColorsGroup = styled('div')`
  display: flex;
  gap: 5px;
`;

export const ButtonGroup = styled('div')`
  display: flex;
  gap: 10px;
`;
