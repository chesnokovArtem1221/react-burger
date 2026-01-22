import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { arrayOf } from 'prop-types';
import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '@/modal/modal';
import { BurgerIngredientsDetails } from '@components/burger-ingredients/burger-ingredients-details/burger-ingredients-details';
import {
  getConstructorBun,
  getConstructorIngredients,
} from '@services/slices/burger-constructor-slice';
import {
  getIngredientsDetails,
  ingredientsDetails,
} from '@services/slices/ingredient-details-slice';
import { dataType } from '@utils/data-type';

import styles from './burger-ingredients-item.module.css';

export const BurgerIngredientsItem = ({ sort, ingredients }) => {
  const dispatch = useDispatch();
  const ingredientDetail = useSelector(getIngredientsDetails);
  const [modal, setModal] = useState({
    active: false,
  });

  const closeModal = () => {
    setModal({
      active: false,
    });
    dispatch(ingredientsDetails(null));
  };

  return (
    <div className={styles.wrapper + ' pt-6 pb-2 pl-4 pr-4'}>
      {ingredients
        .filter((el) => el.type === sort)
        .map((el) => (
          <Cart key={el._id} el={el} setModal={setModal} />
        ))}
      {modal.active && ingredientDetail != null && (
        <Modal close={closeModal}>
          <BurgerIngredientsDetails card={ingredientDetail} />
        </Modal>
      )}
    </div>
  );
};

const Cart = ({ el, setModal }) => {
  const dispatch = useDispatch();

  const constructorIngredients = useSelector(getConstructorIngredients);
  const constructorBun = useSelector(getConstructorBun);

  const activeModal = (el) => {
    setModal({
      active: true,
    });
    dispatch(ingredientsDetails(el));
  };

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: el,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const count =
    el.type === 'bun'
      ? constructorBun && constructorBun._id === el._id
        ? 2
        : 0
      : constructorIngredients.filter((item) => item._id === el._id).length;

  return (
    <div
      ref={dragRef}
      className={styles.ingredient + ' mb-8'}
      onClick={() => activeModal(el)}
    >
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <img className={'pl-4 pr-4 pb-1'} src={el.image} alt={el.name} />
      <p className={styles.price + ' text text_type_digits-default mb-1'}>
        {el.price} <CurrencyIcon type="primary" />
      </p>
      <p className={styles.name + ' text text_type_main-default'}>{el.name}</p>
    </div>
  );
};

BurgerIngredientsItem.propTypes = {
  ingredients: arrayOf(dataType.isRequired).isRequired,
};
