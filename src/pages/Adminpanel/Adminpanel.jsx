import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styles from './Adminpanel.module.scss';
import ProductList from '../../AdminComponentsCurrent/UI/ProductList/ProductList';
import CreateProduct from '../../AdminComponentsCurrent/Logic/CreateProduct/CreateProduct';
import { fetchCategories, fetchProducts, getPermisson } from '../../http/productsAPI';
import { createContext } from 'react';
import CategoriesControl from '../../AdminComponentsCurrent/UI/CategoriesControl/CategoriesControl';

export const AdminPanelContext = createContext({});

function Adminpanel() {
  // ПОЛУЧИТЬ ДАТУ
  const getCurrentDate = () => {
    let date = new Date();
    let output =
      String(date.getDate()).padStart(2, '0') +
      '/' +
      String(date.getMonth() + 1).padStart(2, '0') +
      '/' +
      date.getFullYear();

    return output;
  };

  // СОСТОЯНИЯ
  const [products, setProducts] = useState([]);
  const [thisProducts, setThisProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [style, setStyle] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectValue, setSelectValue] = useState(0);

  const [isCreateProd, setIsCreateProd] = useState(false);
  const [isCategoryControl, setIsCategoryControl] = useState(true);

  useEffect(() => {
    async function checkValue() {
      if (Number(selectValue) === 0) {
        return fetchProducts().then((data) =>
          setProducts(data.sort((a, b) => (a.id > b.id ? 1 : -1))),
        );
      } else {
        return fetchProducts().then((data) =>
          setProducts([
            ...data
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .filter((elem) => elem.categories == selectValue),
          ]),
        );
      }
    }
    checkValue();
  }, [selectValue]);

  // Уникальный список категорий
  useEffect(() => {
    function unique(arr) {
      let result = [];
      for (let str of arr) {
        if (!result.includes(str)) {
          result.push(str);
        }
      }
      return result;
    }
    const array = [];
    style.forEach((elem) => {
      array.push(elem.categoryID);
    });
    setCategoryList(unique(array));
  }, [style]);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
    fetchCategories().then((data) => setCategories(data));
    // async function getFetch() {
    //   await axios
    //     .get('https://63086b3246372013f57cb1e1.mockapi.io/style')
    //     .then((res) => setStyle(res.data));
    // }
    // getFetch();
  }, []);

  const handleOpenCreateProd = () => {
    setIsCreateProd(!isCreateProd);
    setIsCategoryControl(false);
  };
  const handleCloseCreateProd = () => {
    setIsCreateProd(false);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const handleOpenCategoryControl = () => {
    setIsCategoryControl(!isCategoryControl);
    setIsCreateProd(false);
  };

  // АУТЕНТИФИКАЦИЯ

  const [isAuth, setIsAuth] = useState(JSON.parse(sessionStorage.getItem('isAuthSession')));
  const [password, setPassword] = useState('');

  const handleSendPassword = () => {
    const formData = new FormData();
    formData.append('password', `${password}`);

    getPermisson(formData).then(
      (data) => {
        setIsAuth(true);
        sessionStorage.setItem('isAuthSession', JSON.stringify(true));
      },
      (reason) => alert('Неверный пароль'),
    );
  };

  return (
    <>
      {isAuth ? (
        <section className={styles.adminpanel}>
          <div className={styles.wrapper}>
            <AdminPanelContext.Provider
              value={{
                thisProducts,
                setThisProducts,
                products,
                setProducts,
                categories,
                setCategories,
                style,
                setStyle,
              }}>
              <div className={styles.header}>
                <h2>Панель администратора</h2>
                <div className={styles.info}>
                  <p>
                    <strong>Дата входа:</strong> {getCurrentDate()}
                  </p>
                  <Link to="/">
                    <button className={styles.leave}>Вернуться в магазин</button>
                  </Link>
                </div>
              </div>
              <div className={styles.body}>
                <div className={styles.titles}>
                  <h3>Товары</h3>
                  <p>(Всего: {products.length} товаров)</p>
                </div>
                <div className={styles.navigation}>
                  <div className={styles.categories}>
                    <p>Выбрать категорию:</p>
                    <select
                      value={selectValue}
                      onChange={(e) => setSelectValue(e.target.value)}
                      name="category"
                      id="">
                      <option value={0}>Все категории</option>
                      {categories.map((elem) => (
                        <option key={`option adminpanel ${elem.number}`} value={elem.id}>
                          {elem.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div className={styles.search}>
                    <p>Поиск по навзванию:</p>
                    <input type="text" />
                  </div> */}
                  <div className={styles.createprod}>
                    <button onClick={handleOpenCreateProd} className={styles.createprodButton}>
                      Создать новый товар
                    </button>
                    <button onClick={handleOpenCategoryControl} className={styles.createprodCate}>
                      Категории и Стили
                    </button>
                  </div>
                </div>
                {isCreateProd && <CreateProduct handleCloseCreateProd={handleCloseCreateProd} />}
                {isCategoryControl && <CategoriesControl />}
                <ProductList items={products} />
              </div>
            </AdminPanelContext.Provider>
          </div>
        </section>
      ) : (
        <div className={styles.login}>
          <div className={styles.loginWrapper}>
            <div className={styles.loginBody}>
              <p>Введите пароль для доступа к панели администратора:</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <button onClick={handleSendPassword}>Подтвердить</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Adminpanel;
