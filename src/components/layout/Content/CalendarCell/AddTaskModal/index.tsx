// Libs
import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
// Components
import Modal from 'components/shared/Modal';
import MultipleSelect from './MultiiSelect';
// Store
import { DispatchType } from 'store/root';
import { addTask } from 'store/calendar-service/reducer';
// Constants
import { taskColors } from 'core/contants';
// Interfaces
import { Task } from 'store/calendar-service/interfaces';
import { Button, Input } from '@mui/material';
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
      date: new Date(),
      label: 'New task',
      colors: ['yellow'],
      taskId: 'sjdksndn',
    },
    onSubmit: (values) => {
      console.log(values);
      const newTask = {
        newTask: values,
        dayId: dayId,
      };
      dispatch(addTask(newTask));
      formik.resetForm();
      onClose();
    },
  });

  useEffect(() => {
    formik.setFieldValue('date', new Date());
    formik.setFieldValue('taskId', uuidv4());
  }, [isOpen]);

  const { values, handleChange, handleSubmit, isValid } = formik;

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
          <Button disabled={!isValid} variant="contained" type="submit">
            Create
          </Button>
          <Button variant="outlined" type="submit">
            Close
          </Button>
        </Styled.ButtonGroups>
      </Styled.Form>
    </Modal>
  );
};

export default AddTaskModal;
