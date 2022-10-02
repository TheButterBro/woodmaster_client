import React from 'react';
import { useState } from 'react';
import { createStyle } from '../../../http/productsAPI';
import styles from './AddStyle.module.scss';

function AddStyle({ handleCloseAddStyle, thisCategoryId }) {
  const [newStyle, setNewStyle] = useState('');
  console.log(thisCategoryId);

  const handleAddStyle = () => {
    if (newStyle !== '') {
      const formData = new FormData();

      formData.append('title', newStyle);
      formData.append('categoriesId', thisCategoryId.id);
      formData.append('number', `${Date.now()}`);

      createStyle(formData).then(window.location.reload());
    } else {
      alert('Название не может быть пустим!!! :С');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <div className={styles.title}>Введите название нового стиля:</div>
        <input
          onChange={(e) => setNewStyle(e.target.value)}
          value={newStyle}
          type="text"
          className={styles.input}
        />
        <div className={styles.buttons}>
          <button onClick={handleCloseAddStyle} className={styles.button}>
            Отмена
          </button>
          <button onClick={handleAddStyle} className={styles.button}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddStyle;
