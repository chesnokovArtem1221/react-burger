import { func } from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

const modalRoot = document.getElementById('root-modal');

export const Modal = ({ close, children }) => {
  useEffect(() => {
    const clickEsc = (e) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', clickEsc, false);

    return () => {
      document.removeEventListener('keydown', clickEsc, false);
    };
  }, [close]);

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.fog} onClick={close} aria-hidden="true" />
      <div className={styles.wrapper}>
        <div className={styles.close} onClick={close} aria-hidden="true" />
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = { onClose: func };
