import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ close, children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.fog} onClick={close} aria-hidden="true" />
      <div className={styles.wrapper}>
        <div className={styles.close} onClick={close} aria-hidden="true" />
        {children}
      </div>
    </div>
  );
};
