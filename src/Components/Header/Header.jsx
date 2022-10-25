import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.scss';

function Header({ imgHome }) {
  const [isOpened, setIsOpened] = useState(false);
  const handleOpenMenu = () => {
    setIsOpened(true);
  };
  const handleCloseMenu = () => {
    setIsOpened(false);
  };
  return (
    <header>
      <div className={styles.wrapper}>
        <div className={styles.information}>
          <h1 className={styles.logo}>WoodMaster</h1>
          <b className={styles.who}>Мебельная фабрика</b>
          <div className={styles.splitter}></div>
          <b className={styles.slogan}>Создаем персональные интерьеры</b>
          <div className={styles.contacts}>
            <div className={styles.phones}>
              <a href="tel:+7 (927) 805-46-89">+7 (927) 805-46-89</a>
              <a href="tel:+7 (927) 817-66-64">+7 (927) 817-66-64</a>
            </div>
          </div>
        </div>
        <img
          src={imgHome ? '/images/header_img.webp' : '/images/header_img_2.webp'}
          alt=""
          className={styles.image}
        />
      </div>
      <div
        onClick={handleOpenMenu}
        className={!isOpened ? styles.navButton : styles.navButtonHidden}>
        <div className={styles.lines}>
          <span className={styles.line}></span>
        </div>
      </div>
      <Navigation isOpened={isOpened} handleCloseMenu={handleCloseMenu} />
    </header>
  );
}

export default Header;
