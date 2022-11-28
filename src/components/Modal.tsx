import CloseIcon from '@mui/icons-material/Close';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import MuiModal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { ReactElement } from 'react';
import styles from './Modal.module.scss';

export default function Modal({
  open = false,
  onClose = () => console.debug('closing...'),
  children,
}: {
  open?: boolean;
  onClose?: () => void;
  children?: ReactElement;
}): ReactElement {
  return (
    <MuiModal open={open}>
      <div className={styles.modalBackdrop}>
        <ClickAwayListener onClickAway={onClose}>
          <Paper className={styles.body}>
            <IconButton aria-label="close" className={styles.close} size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
            {children}
          </Paper>
        </ClickAwayListener>
      </div>
    </MuiModal>
  );
}
