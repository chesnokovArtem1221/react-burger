import { arrayOf } from 'prop-types';

import { BurgerIngredientsItem } from '@components/burger-ingredients/burger-ingredients-item/burger-ingredients-item';
import { dataType } from '@utils/data-type';

import styles from './burger-ingredients-group.module.css';

export const BurgerIngredientsGroup = (props) => {
  return (
    <div className={styles.wrapper + ' mt-10'}>
      <p className="text text_type_main-medium" ref={props.bunRef}>
        Булки
      </p>
      <BurgerIngredientsItem sort={'bun'} />

      <p className="text text_type_main-medium" ref={props.mainRef}>
        Начинки
      </p>
      <BurgerIngredientsItem sort={'main'} />

      <p className="text text_type_main-medium" ref={props.sauceRef}>
        Соусы
      </p>
      <BurgerIngredientsItem sort={'sauce'} />
    </div>
  );
};

BurgerIngredientsGroup.propTypes = {
  ingredients: arrayOf(dataType.isRequired).isRequired,
};
