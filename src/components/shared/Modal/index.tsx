// Libs
import { FC, ReactNode } from 'react';
import { Modal as MuiModal, Box } from '@mui/material';
// Styles
import { style } from './styles';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  return (
    <MuiModal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <p style={{ textAlign: 'center', fontSize: '18px' }}>{title}</p>
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
