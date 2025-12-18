import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BASE_URL } from '@utils/constant';

import styles from './app.module.css';

export const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(BASE_URL);
        if (!res.ok) {
          return Promise.reject(`Ошибка ${res.status}`);
        }
        const result = await res.json();
        setIngredients(result.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error('error:' + err);
        setError(err);
      }
    })();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />

      {!loading && ingredients.length > 0 ? (
        <>
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
            Соберите бургер
          </h1>
          <main className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </main>
        </>
      ) : error ? (
        <p className={`${styles.main} pl-5 pr-5`}>error</p>
      ) : (
        <Preloader />
      )}
    </div>
  );
};
