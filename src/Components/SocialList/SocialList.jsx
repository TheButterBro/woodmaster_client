import React from 'react';
import styles from './SocialList.module.scss';

function SocialList() {
  return (
    <div className={styles.sociallist}>
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <a href="/" className={styles.item}>
            <div style={{ background: '#7e57c2' }} className={styles.title}>
              Viber
            </div>
            <div className={styles.circle}>
              <img src="/images/icons/vib.png" alt="" />
            </div>
          </a>
          <a href="/" className={styles.item}>
            <div style={{ background: '#40c351' }} className={styles.title}>
              What`s App
            </div>
            <div className={styles.circle}>
              <img src="/images/icons/WA.png" alt="" />
            </div>
          </a>
          <a href="/" className={styles.item}>
            <div style={{ background: '#0077ff' }} className={styles.title}>
              Vkontakte
            </div>
            <div className={styles.circle}>
              <img src="/images/icons/vkontakte.png" alt="" />
            </div>
          </a>
          <a href="/" className={styles.item}>
            <div style={{ background: '#f7b700' }} className={styles.title}>
              Odnoklassniki
            </div>
            <div className={styles.circle}>
              <img src="/images/icons/odno.png" alt="" />
            </div>
          </a>
        </div>
        <div className={styles.head}>
          <div className={styles.item}>
            <div className={styles.title}>Напишите нам в соц. сетях</div>
            <div className={styles.circle}>
              <img src="/images/icons/sociallist.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialList;
