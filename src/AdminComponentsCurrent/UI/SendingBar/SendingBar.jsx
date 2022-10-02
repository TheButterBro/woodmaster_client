import React from 'react';
import styles from './SendingBar.module.scss';

function SendingBar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <svg>
          <circle class={styles.bg} cx="25" cy="25" r="20" />
          <circle class={styles.meter1} cx="25" cy="25" r="20" />
        </svg>
      </div>
    </div>
  );
}

export default SendingBar;
