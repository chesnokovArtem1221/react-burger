import { arrayOf } from 'prop-types';

import { BurgerIngredientsItem } from '@components/burger-ingredients/burger-ingredients-item/burger-ingredients-item';
import { dataType } from '@utils/data-type';

import styles from './burger-ingredients-group.module.css';

export const BurgerIngredientsGroup = ({ ingredients }) => {
  return (
    <div className={styles.wrapper + ' mt-10'}>
      <p className="text text_type_main-medium">Булки</p>
      <BurgerIngredientsItem sort={'bun'} ingredients={ingredients} />

      <p className="text text_type_main-medium">Начинки</p>
      <BurgerIngredientsItem sort={'main'} ingredients={ingredients} />

      <p className="text text_type_main-medium">Соусы</p>
      <BurgerIngredientsItem sort={'sauce'} ingredients={ingredients} />
    </div>
  );
};

BurgerIngredientsGroup.propTypes = {
  ingredients: arrayOf(dataType.isRequired).isRequired,
};
