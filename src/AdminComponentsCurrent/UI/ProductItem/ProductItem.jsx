import React, { useState, useEffect } from 'react';
import DeleteProduct from '../../Logic/DeleteProduct/DeleteProduct';
import ChangeProduct from '../../Logic/ChangeProduct/ChangeProduct';
import styles from './ProductItem.module.scss';
import { deleteProduct } from '../../../http/productsAPI';
import { useContext } from 'react';
import { AdminPanelContext } from '../../../pages/Adminpanel/Adminpanel';

function ProductItem({ item, index, thisCategory, thisStyle }) {
  const { products, categories, style, setProducts, setThisProducts } =
    useContext(AdminPanelContext);

  const isOdd = index % 2 === 0;
  const [thisItem, setThisItem] = useState(item);
  const [isHiddenDelete, setIsHiddenDelete] = useState(true);
  const [isHiddenChange, setIsHiddenChange] = useState(true);
  const [isSendingDelete, setIsSendingDelete] = useState(false);
  const [isSendingChange, setIsSendingChange] = useState(false);

  useEffect(() => {
    setThisItem(item);
  }, [item]);

  const handleOpenDelete = () => {
    setIsHiddenDelete(false);
    document.body.classList.add('scrollHidden');
  };

  const handleCloseDelete = () => {
    setIsHiddenDelete(true);
    document.body.classList.remove('scrollHidden');
  };

  const handleDeleteProduct = (value) => {
    setIsSendingDelete(true);

    deleteProduct(value.id).then(
      setTimeout(() => {
        setProducts(products.filter((elem) => elem.id !== value.id));
        handleCloseDelete();
        setIsSendingDelete(false);
      }, 3000),
    );
  };

  const handleOpenChange = () => {
    setIsHiddenChange(false);
  };

  const handleCloseChange = () => {
    setIsHiddenChange(true);
  };

  return (
    <div key={`productItem item ${index}`}>
      <DeleteProduct
        handleCloseDelete={handleCloseDelete}
        handleDeleteProduct={handleDeleteProduct}
        hiddenValue={isHiddenDelete}
        item={thisItem}
        isSendingDelete={isSendingDelete}
      />
      <div id={item.id} className={styles.item}>
        {isHiddenChange ? (
          <div
            style={{ background: !isOdd ? 'rgba(0, 0, 0, .15)' : 'none' }}
            className={styles.wrapper}>
            <p className={styles.id}>{thisItem.id}</p>
            <div className={styles.img}>
              <img src={process.env.REACT_APP_API_URL + 'public/' + thisItem.img} alt="" />
            </div>
            <p className={styles.name}>{thisItem.name}</p>
            <ul className={styles.description}>
              {thisItem.description && thisItem.description[0] ? (
                thisItem.description
                  // .sort((a, b) => (a.id > b.id ? 1 : -1))
                  .map((i) => (
                    <li key={`productItem ${i.number}`}>
                      <span className={styles.titleSpan}>
                        <strong>{i.title}</strong>
                        {/* <strong>:</strong> */}
                      </span>
                      <div className={styles.textSpan}>
                        <p>{i.text}</p>
                      </div>
                    </li>
                  ))
              ) : (
                <p>-</p>
              )}
            </ul>

            <p className={styles.category}>{thisItem.categories}</p>
            <p className={styles.style}>{thisItem.styleID}</p>

            <p className={styles.price}>{thisItem.price}</p>
            <div className={styles.action}>
              <div className={styles.buttons}>
                <button onClick={handleOpenChange} className={styles.change}>
                  <img width={35} src="images/icons/fix_product.png" alt="" />
                </button>
                <button onClick={handleOpenDelete} className={styles.delete}>
                  <img width={35} src="images/icons/delete_product.png" alt="" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <ChangeProduct
            setThisItem={setThisItem}
            setThisProducts={setThisProducts}
            handleCloseChange={handleCloseChange}
            hiddenValue={isHiddenChange}
            item={thisItem}
            isSendingChange={isSendingChange}
            isOdd={isOdd}
          />
        )}
      </div>
    </div>
  );
}

export default ProductItem;
