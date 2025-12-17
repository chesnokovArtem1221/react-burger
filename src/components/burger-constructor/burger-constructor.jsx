import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { arrayOf } from 'prop-types';
import { useEffect, useState } from 'react';

import { Modal } from '@/modal/modal';
import { ModalOrder } from '@/modal/modal-order/modal-order';
import { dataType } from '@utils/data-type';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients }) => {
  const [modal, setModal] = useState(false);
  const [bun, setBun] = useState({});
  const [sum, setSum] = useState(0);
  const [totalPrice, setTotalPrise] = useState(0);

  useEffect(() => {
    setBun(ingredients.find((el) => el.type === 'bun'));
  }, []);

  useEffect(() => {
    setSum(
      ingredients
        .filter((el) => el.type != 'bun')
        .reduce((el, elPrice) => el + elPrice.price, 0)
    );
    setTotalPrise(bun.price * 2 + sum);
  });

  const activeModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <section className={styles.burger_constructor + ' mt-25'}>
        <div className={styles.ingredients_wrapper}>
          <div className={'pl-8 mb-2'}>
            <ConstructorElement
              isLocked
              price={bun.price}
              text={bun.name}
              thumbnail={bun.image}
              type="top"
            />
          </div>

          <ul className={styles.list + ' mt-1 mb-1 pl-2 pr-4'}>
            {ingredients
              .filter((el) => el.type != 'bun')
              .map((el) => {
                return (
                  <li className={styles.item + ' mb-4'} key={el._id}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={el.name}
                      price={el.price}
                      thumbnail={el.image}
                    />
                  </li>
                );
              })}
          </ul>

          <div className={'pl-8'}>
            <ConstructorElement
              isLocked
              price={bun.price}
              text={bun.name}
              thumbnail={bun.image}
              type="bottom"
            />
          </div>
        </div>
        <div>
          <div className={styles.order + ' mt-10'}>
            <p className="text text_type_digits-medium mr-10">
              <span>{totalPrice}</span>
              <CurrencyIcon type="primary" />
            </p>
            <Button onClick={activeModal} htmlType="button" type="primary" size="medium">
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
