import React from 'react';
import { useState } from 'react';
import { putStyle } from '../../../http/productsAPI';
import styles from './ChangeStyle.module.scss';

function ChangeStyle({ thisStyle }) {
  const [newStyle, setNewStyle] = useState('');
  const [isOpenedChangeStyle, setIsOpenedChangeStyle] = useState(false);

  // УПРАВЛЕНИЕ ОТОБРАЖЕНИЕМ CHANGE_CATEGORY
  const handleOpenChangeStyle = () => {
    setIsOpenedChangeStyle(true);
  };
  const handleCloseChangeStyle = () => {
    setIsOpenedChangeStyle(false);
  };

  //   ЛОГИКА ЗАПРОСА
  console.log(thisStyle);

  const handleChangeStyle = () => {
    if (newStyle !== '') {
      const formData = new FormData();
      formData.append('title', newStyle || thisStyle.title);
      formData.append('number', thisStyle.number);
      formData.append('categoriesId', thisStyle.categoriesId);

      putStyle(thisStyle.id, formData).then(window.location.reload());
    } else {
      alert('Поле названия не может быть пустым!');
    }
  };

  return (
    <>
      <div onClick={handleOpenChangeStyle} className={styles.imgWrapper}>
        <img src="/images/icons/change-category.png" alt="" />
      </div>
      {isOpenedChangeStyle && (
        <div className={styles.wrapper}>
          <div className={styles.body}>
            <div className={styles.title}>Новое название стиля:</div>
            <input
              onChange={(e) => setNewStyle(e.target.value)}
              value={newStyle}
              type="text"
              className={styles.input}
            />
            <div className={styles.buttons}>
              <button onClick={handleCloseChangeStyle} className={styles.button}>
                Отмена
              </button>
              <button onClick={handleChangeStyle} className={styles.button}>
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChangeStyle;
