import { func } from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '@/modal/modal-overlay/modal-overlay';

const modalRoot = document.getElementById('root-modal');

export const Modal = (props) => {
  useEffect(() => {
    const clickEsc = (e) => {
      if (e.key === 'Escape') {
        props.close();
      }
    };

    document.addEventListener('keydown', clickEsc, false);

    return () => {
      document.removeEventListener('keydown', clickEsc, false);
    };
  }, [close]);

  return createPortal(<ModalOverlay {...props} />, modalRoot);
};

Modal.propTypes = { onClose: func };
