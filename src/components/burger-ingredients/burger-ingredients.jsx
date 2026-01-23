import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { arrayOf } from 'prop-types';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { BurgerIngredientsGroup } from '@components/burger-ingredients/burger-ingredients-group/burger-ingredients-group';
import { dataType } from '@utils/data-type';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState('bun');

  const [bunRef, inViewBun] = useInView({
    threshold: 0,
  });
  const [mainRef, inViewMain] = useInView({
    threshold: 0,
  });
  const [sauceRef, inViewSauce] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inViewBun) {
      setCurrentTab('bun');
    } else if (inViewMain) {
      setCurrentTab('main');
    } else if (inViewSauce) {
      setCurrentTab('sauce');
    }
  }, [inViewBun, inViewMain, inViewSauce]);

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={currentTab === 'bun'}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={currentTab === 'main'}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={currentTab === 'sauce'}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <BurgerIngredientsGroup bunRef={bunRef} mainRef={mainRef} sauceRef={sauceRef} />
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: arrayOf(dataType.isRequired).isRequired,
};
