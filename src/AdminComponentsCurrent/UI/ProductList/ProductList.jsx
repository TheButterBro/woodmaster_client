import React, { useEffect } from 'react';
import { useContext } from 'react';
import { AdminPanelContext } from '../../../pages/Adminpanel/Adminpanel';
import ProductItem from '../ProductItem/ProductItem';
import styles from './ProductList.module.scss';

function ProductList({ items }) {
  const { products, style, categories } = useContext(AdminPanelContext);
  return (
    <section className={styles.productlist}>
      {items.length ? (
        <div className={styles.wrapper}>
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
          <div className={styles.body}>
            {items
              .sort((a, b) => (a.id > b.id ? -1 : 1))
              .map((item, index) => (
                <ProductItem
                  products={products}
                  thisCategory={categories.filter((elem) => elem.id === item.categories)}
                  thisStyle={style.filter(
                    (elem) => elem.categoryID === item.categories && elem.id === item.styleID,
                  )}
                  item={item}
                  index={index}
                />
              ))}
          </div>
        </div>
      ) : (
        <p>
          В данной категории товаров не найденно. <br /> Вы можете удалить её или добавить в неё
          новые товары. <br />
          <strong>
            ВНИМАНИЕ! Если категория пустая, то она не будет отображаться для пользоваталей на
            сайте!
          </strong>
        </p>
      )}
    </section>
  );
}

export default ProductList;
