// Libs
import { FC } from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
// Components
import Modal from 'components/shared/Modal';
// Store
import { DispatchType } from 'store/root';
import { deleteTask } from 'store/calendar-service/reducer';
// Styles
import * as Styled from './styles';

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  dayId: string;
}

const DeleteTaskModal: FC<DeleteTaskModalProps> = ({
  isOpen,
  onClose,
  taskId,
  dayId,
}) => {
  const dispatch: DispatchType = useDispatch();
  console.log(taskId);
  const handleDeleteTaskClick = () => {
    const currentTask = { dayId: dayId, taskId: taskId };
    dispatch(deleteTask(currentTask));
  };
  return (
    <Modal
      title="Are you sure you want to delete this task?"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Styled.ButtonGroup>
        <Button onClick={handleDeleteTaskClick} color="error" variant="contained">
          Delete
        </Button>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </Styled.ButtonGroup>
    </Modal>
  );
};

export default DeleteTaskModal;
