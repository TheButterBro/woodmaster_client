import React from 'react';
import styles from './LikeProduct.module.scss';
import './LikeProduct.scss';

import Card from '../Card/Card';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useContext } from 'react';
import { CatalogContext } from '../../App';

function LikeProduct({ param }) {
  const { products } = useContext(CatalogContext);

  let isLikeProducts =
    products.filter((elem) => elem.categories === param.categories && elem.id !== param.id).length >
    1;

  return (
    <>
      <section className={styles.likeProduct + ' likeProduct'}>
        <h2>{isLikeProducts ? 'Товары из этой категории' : 'Люди так же смотрят'}</h2>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          autoplay={{ delay: 3000 }}
          spaceBetween={30}
          slidesPerView={5}
          loop={true}
          pagination={{ clickable: true }}>
          {(isLikeProducts
            ? products.filter(
                (elem) => elem.categories === param.categories && elem.id !== param.id,
              )
            : products
          ).map((item) => (
            <SwiperSlide>
              <Card item={item}></Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}

export default LikeProduct;
