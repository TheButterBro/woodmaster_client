import React from 'react';
import styles from './Reviews.module.scss';

function Reviews() {
  return (
    <section className={styles.reviews}>
      <div className={styles.wrapper}>
        <img src="" alt="" className={styles.img} />
        <div className={styles.body}>
          <h3 className={styles.title}>Отзывы клиентов</h3>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
