import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { fetchProducts, putProduct } from '../../../http/productsAPI';
import { AdminPanelContext } from '../../../pages/Adminpanel/Adminpanel';
import styles from './ChangeProduct.module.scss';

function ChangeProduct({ item, handleCloseChange, isOdd, setThisItem }) {
  const { categories, style, products, setProducts } = useContext(AdminPanelContext);

  const [thisName, setThisName] = useState(item.name);
  const [thisPrice, setThisPrice] = useState(item.price);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState();
  const [thisCategory, setThisCategory] = useState(item.categories);
  const [thisStyle, setThisStyle] = useState(item.styleID || 1);
  const [thisDescription, setThisDescription] = useState(item.description);
  const [descTitle, setDescTitle] = useState();
  const [descText, setDescText] = useState();

  const handlerFileChange = (event) => {
    let file = event.target.files[0];
    setFile(file);

    if (file) {
      setFilename(file.name);
    } else {
      setFilename('');
    }
  };

  const handleAddDesc = () => {
    setThisDescription([...thisDescription, { title: '', text: '', number: `${Date.now()}` }]);
  };
  const handeRemoveDesc = (value) => {
    setThisDescription(thisDescription.filter((i) => i.number !== value.number));
  };

  const handleChangeDescTitle = (e, value) => {
    let newArray = thisDescription.map((elem) =>
      elem.number === value.number ? { ...elem, title: e.target.value } : elem,
    );
    setThisDescription(newArray);
  };
  const handleChangeDescText = (e, value) => {
    let newArray = thisDescription.map((elem) =>
      elem.number === value.number ? { ...elem, text: e.target.value } : elem,
    );
    setThisDescription(newArray);
  };

  async function handleChangeProduct() {
    let formData = new FormData();
    formData.append('categories', thisCategory);
    formData.append('styleID', thisStyle);
    formData.append('name', thisName);
    formData.append('price', `${thisPrice}`);
    formData.append('img', file || item.img);
    formData.append('description', JSON.stringify(thisDescription));
    formData.append('oldDesc', JSON.stringify(item.description));

    await putProduct(item.id, formData)
      .then(handleCloseChange())
      .then(
        setThisItem({
          id: item.id,
          name: thisName,
          price: thisPrice,
          img: filename || item.img,
          description: thisDescription,
          categories: thisCategory,
          styleID: thisStyle,
        }),
      );
  }

  const handleCancelChange = () => {
    handleCloseChange();
    sessionStorage.setItem('anch', null);
  };

  return (
    <>
      <div className={styles.changeproduct}>
        <div className={styles.wrapper}>
          <div className={styles.body + ' ' + (!isOdd && styles.odd)}>
            <div className={styles.wrapper}>
              <div className={styles.id}>{item.id}</div>
              <div className={styles.img}>
                <img src={process.env.REACT_APP_API_URL + 'public/' + item.img} alt="" />
                <div className={styles.fade}></div>
                <input onChange={handlerFileChange} type="file" />
              </div>
              <div className={styles.name}>
                <input
                  type="text"
                  defaultValue={item.name}
                  value={thisName}
                  onChange={(e) => setThisName(e.target.value)}
                />
              </div>
              <ul className={styles.description}>
                {thisDescription && thisDescription[0] ? (
                  thisDescription
                    // .sort((a, b) => (a.id > b.id ? 1 : -1))
                    .map((i) => (
                      <li key={`description ${i.number}`}>
                        <span className={styles.titleSpan}>
                          <input
                            // defaultValue={i.title}
                            value={descTitle || i.title}
                            onChange={(e) => handleChangeDescTitle(e, i)}
                            type="text"
                          />
                        </span>
                        <div className={styles.textSpan}>
                          <input
                            value={descText || i.text}
                            onChange={(e) => handleChangeDescText(e, i)}
                            name=""
                            id=""
                            // defaultValue={i.text}
                          />
                        </div>
                        <button onClick={() => handeRemoveDesc(i)} className={styles.buttonDesc}>
                          Удалить
                        </button>
                      </li>
                    ))
                ) : (
                  <p>-</p>
                )}
                <button onClick={handleAddDesc}>Добавить</button>
              </ul>

              <div className={styles.category}>
                {/* {(thisCategory[0] && thisCategory[0].title) + ` (№ ${item.categories})`} */}
                <select
                  onChange={(e) => setThisCategory(e.target.value)}
                  value={thisCategory}
                  name="category"
                  id=""
                  className={styles.select + ' ' + (!isOdd && styles.odd)}>
                  {categories.map((elem) => (
                    <option value={elem.id}>{elem.title}</option>
                  ))}
                </select>
              </div>
              <div className={styles.style}>
                {/* {(thisStyle[0] && thisStyle[0].title) + ` (№ ${item.styleID})`} */}
                <select
                  onChange={(e) => setThisStyle(e.target.value)}
                  value={thisStyle}
                  name="style"
                  id=""
                  className={styles.select + ' ' + (!isOdd && styles.odd)}>
                  {[...categories.filter((item, index) => item.id == thisCategory)][0] &&
                    [...categories.filter((item, index) => item.id == thisCategory)][0].styles &&
                    [...categories.filter((item, index) => item.id == thisCategory)][0].styles
                      .sort((a, b) => (a > b ? -1 : 1))
                      .map((elem, index) => (
                        <option key={`option style ${elem.id}`} value={index + 1}>
                          {elem.title}
                        </option>
                      ))}
                </select>
              </div>

              <div className={styles.price}>
                <input
                  value={thisPrice}
                  onChange={(e) => setThisPrice(e.target.value)}
                  type="number"
                  defaultValue={item.price}
                />
              </div>
              <div className={styles.action}>
                <button onClick={handleChangeProduct} className={styles.change}>
                  Применить изменения
                </button>
                <button onClick={handleCancelChange} className={styles.delete}>
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangeProduct;
