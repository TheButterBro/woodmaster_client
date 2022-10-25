import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AdminPanelContext } from '../../../pages/Adminpanel/Adminpanel';
import AddCategory from '../AddCategory/AddCategory';
import AddStyle from '../AddStyle/AddStyle';
import ChangeCategory from '../ChangeCategory/ChangeCategory';
import ChangeStyle from '../ChangeStyle/ChangeStyle';
import styles from './CategoriesList.module.scss';

function CategoriesList() {
  const { categories } = useContext(AdminPanelContext);
  const [categoryValue, setCategoryValue] = useState(0);

  const [thisCategoryId, setThisCategoryId] = useState();

  const [isOpenedAddCategory, setIsOpenedAddCategory] = useState(false);

  const [isOpenedAddStyle, setIsOpenedAddStyle] = useState(false);

  // ИННИЦИАЛИЗАЦИЯ ДЕФОЛТНОЙ КАТЕГОРИИ
  useEffect(() => {
    setThisCategoryId({
      id: categories[0] && categories[0].id,
      img: categories[0] && categories[0].img,
    });
  }, [categories]);

  //   УПРАВЛЕНИЕ НАВИГАЦИЕЙ ПО КАТЕГОРИЯМ
  const handleSelectCategory = (value, i) => {
    setCategoryValue(value);
    setThisCategoryId({ id: i.id, img: i.img });
  };

  // УПРАВЛЕНИЕ ОТОБРАЖЕНИЕМ ADD_CATEGORY
  const handleOpenAddCategory = () => {
    setIsOpenedAddCategory(true);
  };
  const handleCloseAddCategory = () => {
    setIsOpenedAddCategory(false);
  };

  // УПРАВЛЕНИЕ ОТОБРАЖЕНИЕМ ADD_STYLE
  const handleOpenAddStyle = () => {
    setIsOpenedAddStyle(true);
  };
  const handleCloseAddStyle = () => {
    setIsOpenedAddStyle(false);
  };

  return (
    <>
      {isOpenedAddCategory && <AddCategory handleCloseAddCategory={handleCloseAddCategory} />}

      {isOpenedAddStyle && (
        <AddStyle thisCategoryId={thisCategoryId} handleCloseAddStyle={handleCloseAddStyle} />
      )}
      <div className={styles.wrapper}>
        <p>Категории:</p>
        <div className={styles.body}>
          {categories
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((i, index) => (
              <div key={`category ${index}`} className={styles.itemWrapper}>
                <div
                  onClick={() => handleSelectCategory(index, i)}
                  className={(categoryValue == index && styles.selected) + ' ' + styles.item}>
                  {i.title} ({i.id})
                </div>
                <ChangeCategory thisCategoryId={i} />
              </div>
            ))}
          <button onClick={handleOpenAddCategory} className={styles.add}>
            Добавить категорию
          </button>
        </div>
        <p>Стили категории:</p>
        <div className={styles.styles}>
          {categories[categoryValue] && categories[categoryValue].styles.length ? (
            categories[categoryValue].styles
              // .sort((a, b) => (a.id > b.id ? -1 : 1))
              .map((i) => (
                <div key={`style ${i.id}`} className={styles.styleWrapper}>
                  <div className={styles.style}>{i.title}</div>
                  <ChangeStyle
                    thisStyle={i}
                    styleID={categories[categoryValue].styles.indexOf(i) + 1}
                  />
                </div>
              ))
          ) : (
            <p>
              У данной категории нет стилей. <br /> Один стиль будет создан автоматически и будет
              дублировать название категории.
            </p>
          )}
          <button onClick={handleOpenAddStyle} className={styles.add}>
            Добавить подкатегорию
          </button>
        </div>
      </div>
    </>
  );
}

export default CategoriesList;
