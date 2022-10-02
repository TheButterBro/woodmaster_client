import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CatalogContext } from '../../App';
import CallForm from '../../Business/CallForm/CallForm';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import LikeProduct from '../../Components/LikeProduct/LikeProduct';
import styles from './Product.module.scss';

function Product({ item }) {
  const { thisCategories } = useContext(CatalogContext);

  const getOrder = () => {
    document.getElementById('order').scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };
  useEffect(() => {
    setTimeout(() => {
      document.getElementById('scroll').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 300);
  }, [item]);

  return (
    <>
      <Header imgHome={false} />
      <div id="order">
        <CallForm />
      </div>
      <section className={styles.product}>
        <div id="scroll" style={{ position: 'absolute', top: '-85px', left: '0' }}></div>
        <div className={styles.container}>
          <Link to="/catalog">← Вернуться к каталогу</Link>
          <div className={styles.wrapper}>
            <div className={styles.img}>
              <img src={process.env.REACT_APP_API_URL + item.img} alt="Картинка" />
            </div>
            <div className={styles.content}>
              <div className={styles.text}>
                <h1 className={styles.title}>{item.name}</h1>
                <p className={styles.subtitle}>
                  {thisCategories &&
                    thisCategories.length &&
                    thisCategories
                      .filter((i) => i.id === item.categories)[0]
                      .styles.map((elem) => elem.styleID === item.styleID && <p> {elem.title}</p>)}
                </p>
                <div className={styles.description}>
                  {item.description && item.description.length ? (
                    item.description.map((elem, index) => (
                      <div
                        style={{ background: index % 2 === 0 && 'lightgrey' }}
                        className={styles.descRow}>
                        <p className={styles.descTitle}>{elem.title}:</p>
                        <p className={styles.descText}>{elem.text}</p>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
                <div className={styles.row}>
                  <div className={styles.price}>
                    <b>Цена</b>
                    <p>От {item.price} Р</p>
                  </div>
                </div>
              </div>
              <div className={styles.order}>
                <button onClick={getOrder}>Оставить заявку</button>
                {/* <p>Подберем индивидуальный дизайн любой сложности</p> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <LikeProduct param={{ categories: item.categories, id: item.id }} />
      <Footer />
    </>
  );
}

export default Product;
