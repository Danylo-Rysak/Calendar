// Libs
import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Input } from '@mui/material';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
// Components
import Modal from 'components/shared/Modal';
import MultipleSelect from 'components/shared/MultiiSelect';
// Store
import { DispatchType } from 'store/root';
import { addTask } from 'store/calendar-service/reducer';
// Constants
import { taskColors } from 'core/constants';
// Interfaces
import { Task } from 'store/calendar-service/interfaces';
// Styles
import * as Styled from './styles';

interface AddTaskModalProps {
  dayId: string;
  isOpen: boolean;
  onClose: () => void;
}

const AddTaskModal: FC<AddTaskModalProps> = ({ dayId, isOpen, onClose }) => {
  const dispatch: DispatchType = useDispatch();

  const formik = useFormik<Task>({
    initialValues: {
      date: null,
      label: 'New task',
      colors: ['yellow'],
      taskId: '',
    },
    onSubmit: (values) => {
      const newTask = {
        newTask: values,
        dayId: dayId,
      };
      dispatch(addTask(newTask));
      formik.resetForm();
      onClose();
    },
  });

  const { values, handleChange, handleSubmit, setFieldValue } = formik;

  useEffect(() => {
    setFieldValue('date', new Date());
    setFieldValue('taskId', uuidv4());
  }, [isOpen]);

  return (
    <Modal title="Add task" isOpen={isOpen} onClose={onClose}>
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
          <Button
            disabled={values.label === '' || values.colors.length === 0}
            variant="contained"
            type="submit"
          >
            Create
          </Button>
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
        </Styled.ButtonGroups>
      </Styled.Form>
    </Modal>
  );
};

export default AddTaskModal;
