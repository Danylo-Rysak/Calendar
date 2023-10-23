// Libs
import { FC, useState } from 'react';
import { Button } from '@mui/material';
// Components
import DeleteTaskModal from './DeleteTaskModal';
import EditTaskModal from './EditTaskModal';
// Interfaces
import { Task } from 'store/calendar-service/interfaces';
// Styles
import * as Styled from './styles';

interface TaskItemProps {
  task: Task;
  dayId: string;
}

const TaskItem: FC<TaskItemProps> = ({ task, dayId }) => {
  const [isOpenDeleteTaskModal, setIsOpenDeleteTaskModal] = useState<boolean>(false);
  const [isOpenEditTaskModal, setIsOpenEditTaskModal] = useState<boolean>(false);

  const toggleOpenDeleteTaskModal = (isOpen: boolean) => () => {
    setIsOpenDeleteTaskModal(isOpen);
  };

  const toggleOpenEditTaskModalClick = (isOpen: boolean) => () => {
    setIsOpenEditTaskModal(isOpen);
  };

  const { label, colors, taskId } = task;

  return (
    <>
      <DeleteTaskModal
        isOpen={isOpenDeleteTaskModal}
        onClose={toggleOpenDeleteTaskModal(false)}
        taskId={taskId}
        dayId={dayId}
      />
      <EditTaskModal
        task={task}
        dayId={dayId}
        isOpen={isOpenEditTaskModal}
        onClose={toggleOpenEditTaskModalClick(false)}
      />
      <Styled.TaskItem>
        <Styled.ColorsGroup>
          {colors.map((color, index) => (
            <Styled.TaskColor key={index} color={color} />
          ))}
        </Styled.ColorsGroup>
        <p>{label}</p>
        <Styled.ButtonGroup>
          <Button
            onClick={toggleOpenDeleteTaskModal(true)}
            style={{ height: '30px' }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
          <Button
            onClick={toggleOpenEditTaskModalClick(true)}
            style={{ height: '30px' }}
            color="warning"
            variant="contained"
          >
            Edit
          </Button>
        </Styled.ButtonGroup>
      </Styled.TaskItem>
    </>
  );
};

export default TaskItem;
