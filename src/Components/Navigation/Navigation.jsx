import React from 'react';
import styles from './Navigation.module.scss';
import { Link } from 'react-router-dom';

function Navigation({ isOpened, handleCloseMenu }) {
  return (
    <section
      onClick={() => handleCloseMenu()}
      className={isOpened ? styles.wrapperActive : styles.wrapper}>
      <button onClick={() => handleCloseMenu()} className={styles.close}>
        <div className={styles.lines}>
          <div className={styles.line}></div>
        </div>
      </button>
      <nav className={styles.body}>
        <ul>
          <Link to="/">
            <li>
              <p>Главная</p>
            </li>
          </Link>
          <Link to="/catalog">
            <li>
              <p>Каталог</p>
            </li>
          </Link>
          <Link to="/about-us">
            <li>
              <p>О нас</p>
            </li>
          </Link>
          <Link to="/reference">
            <li>
              <p>Справочные материалы</p>
            </li>
          </Link>
          <Link to="/">
            <li>
              <p>Акции</p>
            </li>
          </Link>
          <Link to="/">
            <li>
              <p>Отзывы</p>
            </li>
          </Link>
          <Link to="/contacts">
            <li>
              <p>Контакты</p>
            </li>
          </Link>
        </ul>
      </nav>
    </section>
  );
}

export default Navigation;
