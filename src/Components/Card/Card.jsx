import React from 'react';
import styles from './Card.module.scss';
import { Link } from 'react-router-dom';

function Card({ item }) {
  const getOrder = () => {
    document.getElementById('order').scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    setTimeout(() => {
      document.getElementById('focus-input').focus();
    }, 1000);
  };

  return (
    <div id="lol" className={styles.bodyItem}>
      <div
        style={{ background: `url(${process.env.REACT_APP_API_URL + item.img})` }}
        className={styles.img}></div>{' '}
      <h4>{item.name}</h4>
      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.price}>
            <button onClick={getOrder}>Заказать дизайн</button>
            {/* <b>от {item.price} ₽</b> */}
          </div>
          <Link to={'/catalog/product/' + item.id}>
            <button>Подробнее</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
