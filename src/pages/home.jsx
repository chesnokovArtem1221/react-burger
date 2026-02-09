import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import {
  getIngredients,
  getIngredientsError,
  getIngredientsLoading,
  loadBurgerIngredients,
} from '@services/slices/burger-ingredients-slice';

import styles from './home.module.css';

export const Home = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(getIngredients);
  const loading = useSelector(getIngredientsLoading);
  const error = useSelector(getIngredientsError);

  useEffect(() => {
    dispatch(loadBurgerIngredients());
  }, []);

  return (
    <>
      {!loading && ingredients.length > 0 ? (
        <>
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
            Соберите бургер
          </h1>
          <main className={`${styles.main} pl-5 pr-5`}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor ingredients={ingredients} />
            </DndProvider>
          </main>
        </>
      ) : error ? (
        <p className={`${styles.main} pl-5 pr-5`}>error</p>
      ) : (
        <Preloader />
      )}
    </>
  );
};
