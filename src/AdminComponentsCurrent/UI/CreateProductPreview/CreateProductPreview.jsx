import React from 'react';
import { useState } from 'react';
import styles from './CreateProductPreview.module.scss';

function CreateProductPreview({ previewItem }) {
  const [defaultItem, setDefaultItem] = useState({
    name: 'Заполните имя товара',
    img: 'Добавьте изображение товара',
    description: 'Добавьте характеристики товара (По желанию)',
    categories: 'Выберите категорию',
    styleID: 'Выберите стиль',
    price: 'Укажите цену',
  });
  return (
    <>
      <div className={styles.header}>
        <p className={styles.id}>ID</p>
        <p className={styles.img}>Изображение</p>
        <p className={styles.name}>Название</p>
        <p className={styles.description}>Характеристики</p>
        <p className={styles.category}>Категория</p>
        <p className={styles.style}>Стиль</p>
        <p className={styles.price}>Цена</p>
        <p className={styles.action}>Действия</p>
      </div>
      <div className={styles.item}>
        <div className={styles.wrapper}>
          <p className={styles.id}>#AUTO</p>
          <div className={styles.img}>
            <p>
              {previewItem.img ? (
                <div className={styles.previewImg}>
                  <p>
                    Изображение загруженно. <br />
                    Выбранное изображение отобразится после создания товара.
                  </p>
                </div>
              ) : (
                defaultItem.img
              )}
            </p>
          </div>
          <p className={styles.name}>{previewItem.name || defaultItem.name}</p>
          <ul className={styles.description}>
            {previewItem.description && previewItem.description.lenght
              ? previewItem.description.map((i) => (
                  <li>
                    <p>
                      <strong>{i.title}: </strong>
                      {i.text}
                    </p>
                  </li>
                ))
              : defaultItem.description}
          </ul>
          <p className={styles.category}>{previewItem.categories || defaultItem.categories}</p>
          <p className={styles.style}>{previewItem.styleID || defaultItem.styleID}</p>
          <p className={styles.price}>{previewItem.price || defaultItem.price}</p>
          <div className={styles.action}></div>
        </div>
      </div>
    </>
  );
}

export default CreateProductPreview;
