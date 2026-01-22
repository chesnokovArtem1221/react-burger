import styles from './modal-order.module.css';

export const ModalOrder = () => {
  return (
    <div className={styles.wrapper + ' pt-30 pb-30'}>
      <p className="text text_type_digits-large mb-8">034536</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <div className={styles.icon + ' mb-15'}></div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
