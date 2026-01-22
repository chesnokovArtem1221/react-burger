import { arrayOf } from 'prop-types';
import { useSelector } from 'react-redux';

import { BurgerIngredientsItem } from '@components/burger-ingredients/burger-ingredients-item/burger-ingredients-item';
import { getIngredients } from '@services/slices/burger-ingredients-slice';
import { dataType } from '@utils/data-type';

import styles from './burger-ingredients-group.module.css';

export const BurgerIngredientsGroup = (props) => {
  const ingredients = useSelector(getIngredients);

  return (
    <div className={styles.wrapper + ' mt-10'}>
      <p className="text text_type_main-medium" ref={props.bunRef}>
        Булки
      </p>
      <BurgerIngredientsItem sort={'bun'} ingredients={ingredients} />

      <p className="text text_type_main-medium" ref={props.mainRef}>
        Начинки
      </p>
      <BurgerIngredientsItem sort={'main'} ingredients={ingredients} />

      <p className="text text_type_main-medium" ref={props.sauceRef}>
        Соусы
      </p>
      <BurgerIngredientsItem sort={'sauce'} ingredients={ingredients} />
    </div>
  );
};

BurgerIngredientsGroup.propTypes = {
  ingredients: arrayOf(dataType.isRequired).isRequired,
};
