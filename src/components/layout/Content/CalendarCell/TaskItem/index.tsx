// Libs
import { FC, useState, DragEvent } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// Components
import DeleteTaskModal from './DeleteTaskModal';
import EditTaskModal from './EditTaskModal';
//  Functions
import {
  getCalendarDayById,
  getIsValidTaskSwipe,
  getNewCalendarDayAfterTaskSwipe,
  getTaskIndexById,
} from 'core/functions';
// Store
import { DispatchType } from 'store/root';
import { dragAndDropTaskInDay } from 'store/calendar-service/reducer';
// Selectors
import { getCalendarDataSelector } from 'store/calendar-service/selectors';
// Interfaces
import { CalendarDay, Task } from 'store/calendar-service/interfaces';
// Styles
import * as Styled from './styles';

interface TaskItemProps {
  task: Task;
  calendarDay: CalendarDay;
}

const TaskItem: FC<TaskItemProps> = ({ task, calendarDay }) => {
  const [isOpenDeleteTaskModal, setIsOpenDeleteTaskModal] = useState<boolean>(false);
  const [isOpenEditTaskModal, setIsOpenEditTaskModal] = useState<boolean>(false);

  const toggleOpenDeleteTaskModal = (isOpen: boolean) => () => {
    setIsOpenDeleteTaskModal(isOpen);
  };

  const toggleOpenEditTaskModalClick = (isOpen: boolean) => () => {
    setIsOpenEditTaskModal(isOpen);
  };

  const { label, colors, taskId } = task;

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('id', `${task.taskId}`);
    event.dataTransfer.setData('targetCalendarId', `${calendarDay.id}`);
  };

  const onTaskDragOverHandler = (event: DragEvent<HTMLDivElement>) =>
    event.preventDefault();

  const dispatch: DispatchType = useDispatch();

  const calendarData = useSelector(getCalendarDataSelector);

  const handleSwipeTasksUpdate = (
    targetTaskId: string,
    targetCalendarDayId: string,
    swapTaskId: string,
    swapCalendarDayId: string
  ) => {
    if (targetCalendarDayId !== swapCalendarDayId) return;

    const currentCalendarDay = getCalendarDayById(calendarData.data, swapCalendarDayId);

    const taskIndex = getTaskIndexById(currentCalendarDay?.tasks, targetTaskId);
    const swipeTaskIndex = getTaskIndexById(currentCalendarDay?.tasks, swapTaskId);

    const isValidTaskSwipe = getIsValidTaskSwipe(
      currentCalendarDay,
      taskIndex,
      swipeTaskIndex,
      targetTaskId,
      swapTaskId
    );

    if (
      currentCalendarDay &&
      typeof taskIndex === 'number' &&
      typeof swipeTaskIndex === 'number' &&
      isValidTaskSwipe
    ) {
      const newCurrentCalendarDay = getNewCalendarDayAfterTaskSwipe(
        currentCalendarDay,
        taskIndex,
        swipeTaskIndex
      );

      dispatch(dragAndDropTaskInDay({ newCurrentCalendarDay, swapCalendarDayId }));
    }
  };

  const onTaskDropHandler = (event: DragEvent<HTMLDivElement>) => {
    const targetId = event.dataTransfer.getData('id');
    const targetCalendarId = event.dataTransfer.getData('targetCalendarId');

    handleSwipeTasksUpdate(targetId, targetCalendarId, task.taskId, calendarDay.id);
  };

  return (
    <>
      <DeleteTaskModal
        isOpen={isOpenDeleteTaskModal}
        onClose={toggleOpenDeleteTaskModal(false)}
        taskId={taskId}
        dayId={calendarDay.id}
      />
      <EditTaskModal
        task={task}
        dayId={calendarDay.id}
        isOpen={isOpenEditTaskModal}
        onClose={toggleOpenEditTaskModalClick(false)}
      />
      <Styled.TaskItem
        onDragStart={handleDragStart}
        onDragOver={onTaskDragOverHandler}
        onDrop={onTaskDropHandler}
        draggable
      >
        <Styled.ColorsGroup>
          {colors.map((color, index) => (
            <Styled.TaskColor key={index} color={color} />
          ))}
        </Styled.ColorsGroup>
        <Styled.Label>{label}</Styled.Label>
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
