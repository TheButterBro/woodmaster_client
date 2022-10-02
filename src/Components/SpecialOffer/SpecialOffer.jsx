import React from 'react';
import styles from './SpecialOffer.module.scss';
import './SpecialOffer.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function SpecialOffer() {
  return (
    <section className={styles.offer}>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <h3>Спецпредложение</h3>
          <b>10% скидка на кухни!</b>
          <p>
            Только до конца месяца получите 10% скидку, заказав кухню по индивидуальным размерам.
            Дизайн-проект кухни составим БЕСПЛАТНО!
          </p>
          <button>
            <a href="/#">Подробнее</a>
          </button>
        </div>
        <div className={styles.body + ' swiperOffer'}>
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            autoplay={{ delay: 3000 }}
            spaceBetween={10}
            slidesPerView={2}
            // navigation
            loop={true}
            pagination={{ clickable: true }}>
            <SwiperSlide>
              <div className={styles.slide}>
                <img src="/images/swiper/3.webp" alt="" />
                <h4>10% скидка на кухни!</h4>
                <a href="/#">Узнать подробнее...</a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.slide}>
                <img src="/images/swiper/1.webp" alt="" />
                <h4>При заказе шкафа-купе подарок!</h4>
                <a href="/#">Узнать подробнее...</a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.slide}>
                <img src="/images/swiper/2.webp" alt="" />
                <h4>Приведи друга и получи бонус!</h4>
                <a href="/#">Узнать подробнее...</a>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default SpecialOffer;
