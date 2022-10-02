import React from 'react';
import styles from './CallForm.module.scss';

function CallForm() {
  return (
    <section className={styles.callform}>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <h2 className={styles.title}>Оставьте заявку</h2>
          <p className={styles.subtitle}>Мы свяжемся с вами в течении нескольких минут</p>
        </div>
        <div className={styles.body}>
          <form action="submit">
            <input placeholder="* Ваше имя:" type="text" />
            <input placeholder="* Телефон:" type="tel" />
            <button>Отправить</button>
          </form>
          <div className={styles.contract}>
            <p>✔ </p>
            <a href="/#">Ознакомлен с пользовательским соглашением</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallForm;
