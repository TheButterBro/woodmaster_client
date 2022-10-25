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
import { useState } from 'react';
import { useEffect } from 'react';

function LikeProduct({ param }) {
  const { products } = useContext(CatalogContext);
  const [slidesCount, setSlidesCount] = useState(5);

  let isLikeProducts =
    products.filter((elem) => elem.categories === param.categories && elem.id !== param.id).length >
    1;
  useEffect(() => {
    if (window.innerWidth < 1764) {
      setSlidesCount(4);
    }
    if (window.innerWidth < 1393) {
      setSlidesCount(3);
    }
    if (window.innerWidth < 615) {
      setSlidesCount(2);
    }
    if (window.innerWidth < 321) {
      setSlidesCount(1);
    }
  }, []);

  return (
    <>
      <section className={styles.likeProduct + ' likeProduct'}>
        <h2>{isLikeProducts ? 'Товары из этой категории' : 'Люди так же смотрят'}</h2>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          autoplay={{ delay: 3000 }}
          spaceBetween={30}
          slidesPerView={slidesCount}
          loop={true}
          pagination={{ clickable: true }}>
          {(isLikeProducts
            ? products.filter(
                (elem) => elem.categories === param.categories && elem.id !== param.id,
              )
            : products
          ).map((item) => (
            <SwiperSlide key={`like prod ${item.id}`}>
              <Card item={item}></Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}

export default LikeProduct;
