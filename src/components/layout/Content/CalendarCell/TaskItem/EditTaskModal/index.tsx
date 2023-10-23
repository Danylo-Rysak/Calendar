// Libs
import { FC } from 'react';
import { useFormik } from 'formik';
import { Button, Input } from '@mui/material';
import { useDispatch } from 'react-redux';
// Components
import Modal from 'components/shared/Modal';
import MultipleSelect from 'components/shared/MultiiSelect';
// Store
import { DispatchType } from 'store/root';
import { editTask } from 'store/calendar-service/reducer';
// Constants
import { taskColors } from 'core/constants';
// Interfaces
import { Task } from 'store/calendar-service/interfaces';
// Styles
import * as Styled from './styles';

interface EditTaskModalProps {
  dayId: string;
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

const EditTaskModal: FC<EditTaskModalProps> = ({ dayId, task, isOpen, onClose }) => {
  const dispatch: DispatchType = useDispatch();
  const formik = useFormik<Task>({
    initialValues: {
      date: task.date,
      label: task.label,
      colors: task.colors,
      taskId: task.taskId,
    },
    onSubmit: (values) => {
      const editedTask = {
        editedTask: values,
        dayId: dayId,
      };
      dispatch(editTask(editedTask));
      onClose();
    },
  });

  const { values, handleChange, handleSubmit, isValid } = formik;

  return (
    <Modal title="Edit task" isOpen={isOpen} onClose={onClose}>
      <Styled.Form onSubmit={handleSubmit}>
        <Input
          id="label"
          name="label"
          type="text"
          value={values.label}
          onChange={handleChange}
        />
        <MultipleSelect
          value={values.colors}
          onChange={handleChange}
          options={taskColors}
        />
        <Styled.ButtonGroups>
          <Button disabled={!isValid} variant="contained" type="submit">
            Edit
          </Button>
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
        </Styled.ButtonGroups>
      </Styled.Form>
    </Modal>
  );
};

export default EditTaskModal;
