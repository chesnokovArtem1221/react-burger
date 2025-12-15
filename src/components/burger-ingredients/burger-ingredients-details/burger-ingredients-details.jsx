import { arrayOf } from 'prop-types';

import { dataType } from '@utils/data-type';

import styles from './burger-ingredients-details.module.css';

export const BurgerIngredientsDetails = ({ card }) => {
  return (
    <div className={styles.wrapper + ' p-10 pb-15'}>
      <p className={styles.title + ' text text_type_main-large'}>Детали ингредиента</p>
      <img className={'mb-4'} src={card.image_large} alt={card.name} />
      <p className="text text_type_main-medium mb-8">
        Биокотлета из марсианской Магнолии
      </p>
      <div className={styles.infoWrapper}>
        <div className={styles.info + ' mr-5'}>
          <p className={'text text_type_main-default mb-2'}>Калории,ккал</p>
          <p className={'text text_type_main-default'}>{card.calories}</p>
        </div>
        <div className={styles.info + ' mr-5'}>
          <p className={'text text_type_main-default mb-2'}>Белки, г</p>
          <p className={'text text_type_main-default'}>{card.proteins}</p>
        </div>
        <div className={styles.info + ' mr-5'}>
          <p className={'text text_type_main-default mb-2'}>Жиры, г</p>
          <p className={'text text_type_main-default'}>{card.fat}</p>
        </div>
        <div className={styles.info}>
          <p className={'text text_type_main-default mb-2'}>Углеводы, г</p>
          <p className={'text text_type_main-default'}>{card.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};

BurgerIngredientsDetails.propTypes = {
  card: arrayOf(dataType.isRequired).isRequired,
};
