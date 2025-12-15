import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { arrayOf } from 'prop-types';
import { useState } from 'react';

import { Modal } from '@/modal/modal';
import { BurgerIngredientsDetails } from '@components/burger-ingredients/burger-ingredients-details/burger-ingredients-details';
import { dataType } from '@utils/data-type';

import styles from './burger-ingredients-item.module.css';

export const BurgerIngredientsItem = ({ sort, ingredients }) => {
  const [modal, setModal] = useState({
    card: null,
    active: false,
  });

  const activeModal = (el) => {
    setModal({
      card: el,
      active: true,
    });
  };
  const closeModal = () => {
    setModal({
      card: null,
      active: false,
    });
  };

  return (
    <div className={styles.wrapper + ' pt-6 pb-2 pl-4 pr-4'}>
      {ingredients
        .filter((el) => el.type === sort)
        .map((el) => (
          <div
            key={el._id}
            className={styles.ingredient + ' mb-8'}
            onClick={() => activeModal(el)}
          >
            <img className={'pl-4 pr-4 pb-1'} src={el.image} alt={el.name} />
            <p className={styles.price + ' text text_type_digits-default mb-1'}>
              {el.price} <CurrencyIcon type="primary" />
            </p>
            <p className={styles.name + ' text text_type_main-default'}>{el.name}</p>
          </div>
        ))}
      {modal.active && (
        <Modal close={closeModal}>
          <BurgerIngredientsDetails card={modal.card} />
        </Modal>
      )}
    </div>
  );
};

BurgerIngredientsItem.propTypes = {
  ingredients: arrayOf(dataType.isRequired).isRequired,
};
