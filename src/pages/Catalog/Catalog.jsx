import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { CatalogContext } from '../../App';
import CallForm from '../../Business/CallForm/CallForm';
import Card from '../../Components/Card/Card';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import styles from './Catalog.module.scss';

function Catalog() {
  const { categories, categoriesList, thisCategories, products } = useContext(CatalogContext);

  const [categoryValue, setCategoryValue] = useState(1);
  const [isScroll, setIsScroll] = useState(false);
  const cateRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      document.getElementById('scroll').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 300);
  }, []);

  const handleSwitchCategory = (value) => {
    setCategoryValue(value);
  };

  const handleScrollTop = () => {
    document.getElementById('scroll').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    function scrollFunction() {
      if (window.pageYOffset > 1050 + cateRef.current.offsetHeight) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    }

    window.addEventListener('scroll', scrollFunction);

    return () => {
      window.removeEventListener('scroll', scrollFunction);
    };
  }, []);

  return (
    <>
      <Helmet>
        <meta name="robots" content="all" />
        <title>Каталог мебельной фабрики WoodMaster в Ульяновске</title>
        <meta
          name="description"
          content="Каталог мебельной фабрики WoodMaster: кухонные гарнитуры, шкаф-купе, спальни, столы, стулья, офисная мебель, кровати."
        />
        <meta
          name="keywords"
          content="заказать кухонных гарнитур, заказать шкаф-купе, заказать стул"
        />
      </Helmet>
      <Header imgHome={false} />
      <CallForm />
      <section className={styles.catalog}>
        <div id="scroll" style={{ position: 'absolute', top: '-85px', left: '0' }}></div>
        <div className={styles.wrapper}>
          <aside className={styles.categories}>
            <div ref={cateRef} className={styles.back}>
              <h3>Каталог</h3>
              {categoriesList.map((elem) => (
                <div key={`catalog catelist ${elem.id}`} className={styles.item}>
                  <button
                    className={categoryValue === elem.id && styles.buttonActive}
                    onClick={() => handleSwitchCategory(elem.id)}>
                    <p>{elem.title}</p>
                  </button>
                </div>
              ))}
            </div>
            <div className={isScroll ? styles.buttonWrapperVisible : styles.buttonWrapper}>
              <button onClick={handleScrollTop} className={styles.button}>
                <img src="/images/icons/arrow_top.svg" alt="" className={styles.arrow} />
              </button>
            </div>
          </aside>
          <div className={styles.body}>
            <div className={styles.catalogWrapper}>
              {thisCategories.filter((i) => i.id === categoryValue)[0] &&
                thisCategories.filter((i) => i.id === categoryValue)[0].styles &&
                thisCategories
                  .filter((i) => i.id === categoryValue)[0]
                  .styles.map(
                    (elem) =>
                      products.find(
                        (product) =>
                          product.styleID === elem.styleID &&
                          product.categories == elem.categoriesId,
                      ) && (
                        <div key={`catalog prod box ${elem.id}`} className={styles.cate}>
                          <h4>{elem.title}</h4>
                          <div className={styles.box}>
                            {products
                              .filter(
                                (item) =>
                                  item.categories === elem.categoriesId &&
                                  elem.styleID == item.styleID,
                              )
                              .map((elem) => (
                                <Card key={`card ${elem.id}`} item={elem} />
                              ))}
                          </div>
                        </div>
                      ),
                  )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Catalog;
