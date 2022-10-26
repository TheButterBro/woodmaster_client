import React from 'react';
import { useState } from 'react';
import styles from './CreateProduct.module.scss';
import { createProduct } from '../../../http/productsAPI';
import CreateProductPreview from '../../UI/CreateProductPreview/CreateProductPreview';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AdminPanelContext } from '../../../pages/Adminpanel/Adminpanel';

function CreateProduct({ handleCloseCreateProd }) {
  const [thisCategory, setThisCategory] = useState(1);
  const [thisStyle, setThisStyle] = useState(1);
  const [thisName, setThisName] = useState('');
  const [thisPrice, setThisPrice] = useState('');

  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [thisDescription, setThisDescription] = useState([]);
  const [descTitle, setDescTitle] = useState('');
  const [descText, setDescText] = useState('');

  const [previewItem, setPreviewItem] = useState({});

  const { style, categories } = useContext(AdminPanelContext);

  useEffect(() => {
    setPreviewItem({
      name: thisName,
      img: filename,
      description: thisDescription,
      categories: thisCategory,
      styleID: thisStyle,
      price: thisPrice,
    });
  }, [thisName, filename, thisDescription, thisCategory, thisStyle, thisPrice]);

  const handlerFileChange = (event) => {
    let file = event.target.files[0];
    setFile(file);
    // let reader = new FileReader();

    if (file) {
      setFilename(file.name);
    } else {
      setFilename('');
    }

    // reader.onload = function (e) {
    //   setFile(e.target.result);
    // };
    // reader.readAsDataURL(event.target.files[0]);

    // if (file != '.png' || file != '.jpg') {
    //   window.alert('File does not support. You must use .png or .jpg ');
    //   return false;
    // }
  };
  const handleCreateDescpription = () => {
    if (descText && descTitle !== '') {
      setThisDescription([
        ...thisDescription,
        { title: descTitle, text: descText, number: `${Date.now()}` },
      ]);
      setDescText('');
      setDescTitle('');
    }
  };
  const handleDeleteDescription = (value) => {
    setThisDescription(thisDescription.filter((item, index) => index !== value));
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (thisName === '' || thisPrice === '' || file.name === '') {
      alert('Заполните обязательные поля: Имя товара, Цена товара, Изображение товара!');
    } else {
      const formData = new FormData();
      formData.append('categories', thisCategory);
      formData.append('styleID', thisStyle);
      formData.append('name', thisName);
      formData.append('price', `${thisPrice}`);
      formData.append('img', file);
      if (thisDescription.length) {
        formData.append('description', JSON.stringify(thisDescription));
      }

      createProduct(formData)
        .then((data) => handleCloseCreateProd())
        .then((data) => window.location.reload());
    }
  };

  return (
    <>
      <div className={styles.createproduct}>
        <div className={styles.wrapper}>
          <p className={styles.title}>Создать новый товар</p>
          <CreateProductPreview previewItem={previewItem} />
          <div className={styles.body}>
            <div className={styles.form}>
              <p className={styles.title}>Основная информация (Обязательные поля):</p>
              <div className={styles.category}>
                <p>Выберите категорию:</p>
                <select
                  onChange={(e) => setThisCategory(e.target.value)}
                  value={thisCategory}
                  name="category"
                  id=""
                  className={styles.select}>
                  {categories.map((elem) => (
                    <option key={`option category create ${elem.id}`} value={elem.id}>
                      {elem.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.style}>
                <p>Выберите стиль:</p>
                <select
                  onChange={(e) => setThisStyle(e.target.value)}
                  value={thisStyle}
                  name="style"
                  id=""
                  className={styles.select}>
                  {[...categories.filter((item) => item.id == thisCategory)] &&
                    [...categories.filter((item) => item.id == thisCategory)][0] &&
                    [...categories.filter((item) => item.id == thisCategory)][0].styles &&
                    [...categories.filter((item) => item.id == thisCategory)][0].styles.map(
                      (elem, index) => (
                        <option key={`option style create ${elem.id}`} value={index + 1}>
                          {elem.title}
                        </option>
                      ),
                    )}
                </select>
              </div>
              <div className={thisName !== '' ? styles.name : styles.name + ' ' + styles.error}>
                <p>Название товара:</p>
                <input onChange={(e) => setThisName(e.target.value)} value={thisName} type="text" />
              </div>
              <div className={thisPrice !== '' ? styles.price : styles.price + ' ' + styles.error}>
                <p>Цена товара:</p>
                <input
                  onChange={(e) => setThisPrice(e.target.value)}
                  value={thisPrice}
                  type="number"
                />
              </div>
              <div className={filename ? styles.image : styles.image + ' ' + styles.error}>
                <p>Загрузить изображение:</p>
                <input onChange={handlerFileChange} type="file" />
              </div>
            </div>
            <div className={styles.form}>
              <p className={styles.title}>Характеристики (Опционально):</p>
              <div className={styles.description}>
                {thisDescription.map((item, index) => (
                  <ul key={`description create prod ${item.id}`} className={styles.descriptionList}>
                    <button
                      onClick={() => handleDeleteDescription(index)}
                      className={styles.descriptionButton}>
                      X
                    </button>
                    <p className={styles.descriptionParag}>
                      [{index + 1}] <strong> {item.title}: </strong>
                      {item.text}
                    </p>
                  </ul>
                ))}
                <div className={styles.descTitle}>
                  <p>Название:</p>
                  <input
                    value={descTitle}
                    onChange={(e) => setDescTitle(e.target.value)}
                    type="text"
                    name="descTitle"
                  />
                </div>
                <div className={styles.descText}>
                  <p>Описание:</p>
                  <textarea
                    value={descText}
                    onChange={(e) => setDescText(e.target.value)}
                    type="text"
                    name="descText"
                  />
                </div>
                <button onClick={handleCreateDescpription}>Добавить характеристику</button>
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
            <div onClick={handleCloseCreateProd} className={styles.cancel}>
              <button>Отменить</button>
            </div>
            <div className={styles.submit}>
              <button onClick={handleCreateProduct}>Создать</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProduct;
