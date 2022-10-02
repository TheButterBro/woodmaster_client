import React, { useLayoutEffect } from 'react';
import styles from './Card.module.scss';
import { Link, useLocation } from 'react-router-dom';

function Card({ item }) {
  console.log(item);
  return (
    <div id="lol" className={styles.bodyItem}>
      <div
        style={{ background: `url(${process.env.REACT_APP_API_URL + item.img})` }}
        className={styles.img}></div>{' '}
      <h4>{item.name}</h4>
      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.price}>
            <p>цена</p>
            <b>от {item.price} ₽</b>
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
