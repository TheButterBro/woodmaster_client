import React from 'react';
import CategoriesList from '../../Logic/CategoriesList/CategoriesList';
import styles from './CategoriesControl.module.scss';

function CategoriesControl() {
  return (
    <section className={styles.categoriescontrol}>
      <div className={styles.wrapper}>
        <p className={styles.title}>Управление категориями и стилями</p>
        <div className={styles.body}>
          <CategoriesList />
        </div>
      </div>
    </section>
  );
}

export default CategoriesControl;
