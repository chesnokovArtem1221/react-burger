import { AppHeader } from '@components/app-header/app-header';
import { Home } from '@pages/home';

import styles from './app.module.css';

export const App = () => {
  return (
    <div className={styles.app}>
      <AppHeader />

      <Home />
    </div>
  );
};
