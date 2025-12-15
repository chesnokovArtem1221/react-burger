import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { arrayOf } from 'prop-types';

import { BurgerIngredientsGroup } from '@components/burger-ingredients/burger-ingredients-group/burger-ingredients-group';
import { dataType } from '@utils/data-type';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <BurgerIngredientsGroup ingredients={ingredients} />
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: arrayOf(dataType.isRequired).isRequired,
};
