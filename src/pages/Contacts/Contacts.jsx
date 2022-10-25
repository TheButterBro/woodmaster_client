import React from 'react';
import Header from '../../Components/Header/Header';
import styles from './Contacts.module.scss';
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import CallForm from '../../Business/CallForm/CallForm';
import Footer from '../../Components/Footer/Footer';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import { useState } from 'react';
function Contacts() {
  // Map.behaviors.disable('scrollZoom');
  // Map.behaviors.disable('drag');
  return (
    <>
      <Helmet>
        <meta name="robots" content="all" />
        <title>Контакты мебельной фабрики WoodMaster в Ульяновске</title>
        <meta
          name="description"
          content="Телефон: +7 (927) 817-66-64, +7 (927) 805-46-89; Адрес: Ульяновск, Академика Сахара, д. 5"
        />
        <meta
          name="keywords"
          content="Контакты мебельной фабрики WoodMaster, адрес  мебельной фабрики WoodMaster, телефон мебельной фабрики WoodMaster"
        />
      </Helmet>
      <Header />
      <CallForm />
      <section className={styles.contacts}>
        <div className={styles.wrapper}>
          <div className={styles.map}>
            <h2>Контакты</h2>
            <div className={styles.content}>
              <div className={styles.phones}>
                <h3>Телефон:</h3>
                <a href="tel:+7 (927) 805-46-89">+7 (927) 805-46-89</a>
                <a href="tel:+7 (927) 817-66-64">+7 (927) 817-66-64</a>
              </div>
              <div className={styles.time}>
                <h3>Режим работы:</h3>
                <p>Прием звонков</p>
                <p>с 9:00 до 20:00 (Пн-Пт)</p>
              </div>
              <div className={styles.address}>
                <h3>Адрес:</h3>
                <p>Ульяновск,</p>
                <p>Академика Сахара д. 5</p>
              </div>
              <div className={styles.company}>
                <h3>Реквизиты компании:</h3>
                <p>
                  ООО "Макс Со" Юридический адрес: 196247, Россия, Санкт-Петербург, Ленинский
                  просп., 151 ОГРН 513002107233
                </p>
              </div>
              <div className={styles.social}>
                <h3>Социальные сети:</h3>
                <div className={styles.images}>
                  <div className={styles.img}>
                    <img width={35} src="/images/icons/viber.png" alt="" />
                  </div>
                  <div className={styles.img}>
                    <img width={35} src="/images/icons/whatsapp.png" alt="" />
                  </div>
                  <div className={styles.img}>
                    <img width={35} src="/images/icons/vk.png" alt="" />
                  </div>
                  <div className={styles.img}>
                    <img width={35} src="/images/icons/ok.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.mapwrapper}>
              <div className={styles.mapcontent}>
                <YMaps>
                  <Map
                    placeMark={[54.335757, 48.471727]}
                    width={100 + '%'}
                    height={100 + '%'}
                    defaultState={{ center: [54.335757, 48.471727], zoom: 15 }}>
                    <Placemark geometry={[54.335757, 48.471727]} properties={{}} />
                    <ZoomControl
                      options={{
                        float: 'right',
                      }}
                    />
                  </Map>
                </YMaps>
              </div>
            </div>
          </div>
          <div className={styles.img}>
            <img src="/images/aboutUsRight_img.jpg" alt="" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Contacts;
