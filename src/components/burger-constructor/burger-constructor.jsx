import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { arrayOf } from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '@/modal/modal';
import { ModalOrder } from '@/modal/modal-order/modal-order';
import { WrapperConstructorElement } from '@components/burger-constructor/wrapper-constructor-element/wrapper-constructor-element';
import {
  addItem,
  getConstructorBun,
  getConstructorIngredients,
  removeItem,
} from '@services/slices/burger-constructor-slice';
import { createOrder } from '@services/slices/order-details-slice';
import { dataType } from '@utils/data-type';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const ingredients = useSelector(getConstructorIngredients);
  const constructorBun = useSelector(getConstructorBun);

  // const activeModal = () => {
  //   setModal(true);
  // };

  const closeModal = () => {
    setModal(false);
  };

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      dispatch(addItem(item));
    },
  });

  const handleOrderClick = useCallback(() => {
    if (!constructorBun) return;

    const ingredientID = [
      constructorBun._id,
      ...ingredients.map((item) => item._id),
      constructorBun._id,
    ];

    dispatch(createOrder(ingredientID));
    setModal(true);
  }, [dispatch, constructorBun, ingredients]);

  const removeIngredient = useCallback(
    (item) => {
      dispatch(removeItem(item));
    },
    [dispatch]
  );

  const totalPrice = useMemo(() => {
    const bunPrice = constructorBun ? constructorBun.price * 2 : 0;
    const itemsPrice = ingredients.reduce((acc, item) => acc + item.price, 0);
    return bunPrice + itemsPrice;
  }, [constructorBun, ingredients]);

  return (
    <>
      <section className={styles.burger_constructor + ' mt-25'} ref={dropTarget}>
        <div className={styles.ingredients_wrapper}>
          <div className={'pl-8 mb-2'}>
            {constructorBun ? (
              <ConstructorElement
                type={'top'}
                isLocked={true}
                text={constructorBun.name + ' (верх)'}
                price={constructorBun.price}
                thumbnail={constructorBun.image}
              />
            ) : (
              <ConstructorElement type={'top'} isLocked={true} />
            )}
          </div>

          <ul className={styles.list + ' mt-1 mb-1 pl-2 pr-4'}>
            {ingredients
              .filter((el) => el.type != 'bun')
              .map((el, index) => {
                return (
                  <WrapperConstructorElement
                    key={el.uuid}
                    el={el}
                    index={index}
                    removeIngredient={removeIngredient}
                  />
                );
              })}
          </ul>

          <div className={'pl-8'}>
            {constructorBun ? (
              <ConstructorElement
                type={'bottom'}
                isLocked={true}
                text={constructorBun.name + ' (низ)'}
                price={constructorBun.price}
                thumbnail={constructorBun.image}
              />
            ) : (
              <ConstructorElement type={'bottom'} isLocked={true} />
            )}
          </div>
        </div>
        <div>
          <div className={styles.order + ' mt-10'}>
            <p className="text text_type_digits-medium mr-10">
              <span>{totalPrice}</span>
              <CurrencyIcon type="primary" />
            </p>
            <Button
              onClick={handleOrderClick}
              htmlType="button"
              type="primary"
              size="medium"
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      </section>

      {modal && (
        <Modal close={closeModal}>
          <ModalOrder />
        </Modal>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  ingredients: arrayOf(dataType.isRequired).isRequired,
};
