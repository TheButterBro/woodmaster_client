import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CatalogContext } from '../../App';
import styles from './Categories.module.scss';

function Categories() {
  const { categoriesList } = useContext(CatalogContext);

  return (
    <section className={styles.categories}>
      <div className={styles.wrapper}>
        <ul>
          {categoriesList.map((elem) => (
            <li
              style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL + elem.img})` }}
              key={elem.id}>
              <div className={styles.body}>
                <h3>{elem.title}</h3>
                <Link to="/catalog">
                  <button>Подробнее</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Categories;
