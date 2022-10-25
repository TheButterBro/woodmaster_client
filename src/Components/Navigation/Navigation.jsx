import React from 'react';
import './Navigation.scss';
import styles from './Navigation.module.scss';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

function Navigation({ isOpened, handleCloseMenu }) {
  return (
    <CSSTransition in={isOpened} timeout={500} classNames="my-node" mountOnEnter unmountOnExit>
      <section onClick={() => handleCloseMenu()} className={styles.wrapper}>
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
            {/* <Link to="/">
            <li>
              <p>Акции</p>
            </li>
          </Link>
          <Link to="/">
            <li>
              <p>Отзывы</p>
            </li>
          </Link> */}
            <Link to="/contacts">
              <li>
                <p>Контакты</p>
              </li>
            </Link>
          </ul>
        </nav>
      </section>
    </CSSTransition>
  );
}

export default Navigation;
