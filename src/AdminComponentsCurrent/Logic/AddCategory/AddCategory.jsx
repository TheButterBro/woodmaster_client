import React from 'react';
import { useState } from 'react';
import { createCategory } from '../../../http/productsAPI';
import styles from './AddCategory.module.scss';

function AddCategory({ handleCloseAddCategory }) {
  const [newCategory, setNewCategory] = useState();
  const [file, setFile] = useState(null);

  const handlerFileChange = (event) => {
    let file = event.target.files[0];
    setFile(file);
  };

  const handleAddCategory = () => {
    if (file && newCategory !== '') {
      const formData = new FormData();

      formData.append('title', newCategory);
      formData.append('img', file);

      createCategory(formData).then(window.location.reload());
      //   setCategories([...categories, { title: newCategory, styles: [{ title: newCategory }] }]);
    } else {
      alert('Оба поля должны быть заполнены');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <div className={styles.title}>Введите название новой категории:</div>
        <input
          onChange={(e) => setNewCategory(e.target.value)}
          value={newCategory}
          type="text"
          className={styles.input}
        />
        <div className={styles.title}>Загрузите изображение для новой категории:</div>
        <input onChange={handlerFileChange} type="file" className={styles.input2} />
        <div className={styles.buttons}>
          <button onClick={handleCloseAddCategory} className={styles.button}>
            Отмена
          </button>
          <button onClick={handleAddCategory} className={styles.button}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
