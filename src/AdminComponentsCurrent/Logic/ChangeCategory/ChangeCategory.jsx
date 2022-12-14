import React from 'react';
import { useState } from 'react';
import { putCategory, deleteCategory } from '../../../http/productsAPI';
import styles from './ChangeCategory.module.scss';

function ChangeCategory({ thisCategoryId }) {
  const [newCategory, setNewCategory] = useState('');
  const [isOpenedChangeCategory, setIsOpenedChangeCategory] = useState(false);
  const [file, setFile] = useState(null);

  // УПРАВЛЕНИЕ ОТОБРАЖЕНИЕМ CHANGE_CATEGORY
  const handleOpenChangeCategory = () => {
    setIsOpenedChangeCategory(true);
  };
  const handleCloseChangeCategory = () => {
    setIsOpenedChangeCategory(false);
  };

  //   ЛОГИКА ЗАПРОСА

  const handlerFileChange = (event) => {
    let file = event.target.files[0];
    setFile(file);
  };

  const handleChangeCategory = () => {
    if (file || newCategory !== '') {
      const formData = new FormData();
      formData.append('title', newCategory || thisCategoryId.title);
      formData.append('img', file || thisCategoryId.img);

      putCategory(thisCategoryId.id, formData).then(window.location.reload());
    } else {
      alert('Измените название И/ИЛИ изображение категории!');
    }
  };

  const handleDeleteCategory = () => {
    deleteCategory(thisCategoryId.id);
  };

  return (
    <>
      <div onClick={handleOpenChangeCategory} className={styles.imgWrapper}>
        <img src="/images/icons/change-category.png" alt="" />
      </div>
      {isOpenedChangeCategory && (
        <div className={styles.wrapper}>
          <div className={styles.body}>
            <div className={styles.title}>Новое название категории:</div>
            <input
              onChange={(e) => setNewCategory(e.target.value)}
              value={newCategory}
              type="text"
              className={styles.input}
            />
            <div className={styles.title}>Если хотите изменить изображение, загрузите его:</div>
            <input onChange={handlerFileChange} type="file" className={styles.input2} />
            <div className={styles.buttons}>
              <button onClick={handleCloseChangeCategory} className={styles.button}>
                Отмена
              </button>
              <button onClick={handleChangeCategory} className={styles.button}>
                Добавить
              </button>
            </div>
            <div className={styles.delete}>
              <p>
                Если вы удалите категорию - товары, которые были в ней, перестанут отображаться,
                пока вы не зададите им новую категорию.
              </p>
              <button onClick={handleDeleteCategory}>Удалить</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChangeCategory;
