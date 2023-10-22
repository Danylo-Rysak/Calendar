// Libs
import { FC } from 'react';
// Interfaces
import { Task } from 'store/calendar-service/interfaces';
// Styles
import * as Styled from './styles';
import { Button } from '@mui/material';

interface TaskItemProps {
  task: Task;
}

const TaskItem: FC<TaskItemProps> = ({ task }) => {
  const { label, colors } = task;
  return (
    <Styled.TaskItem>
      <Styled.ColorsGroup>
        {colors.map((color, index) => (
          <Styled.TaskColor key={index} color={color} />
        ))}
      </Styled.ColorsGroup>
      <p>{label}</p>
      <Styled.ButtonGroup>
        <Button style={{ height: '30px' }} color="error" variant="contained">
          Delete
        </Button>
        <Button style={{ height: '30px' }} color="warning" variant="contained">
          Edit
        </Button>
      </Styled.ButtonGroup>
    </Styled.TaskItem>
  );
};

export default TaskItem;
