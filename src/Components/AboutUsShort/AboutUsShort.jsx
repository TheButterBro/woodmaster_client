import React from 'react';
import styles from './AboutUsShort.module.scss';

function AboutUsShort() {
  return (
    <section className={styles.aboutUs}>
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <div className={styles.text}>
            <h3 className={styles.title}>Немного о нас</h3>
            <p className={styles.subtitle}>
              Наша компания «WoodMaster» уже долгое время специализируется на продаже качественной
              мебели и теперь мы можем с уверенностью заявить о том, что достигли высокой
              эффективности в нашей работе.
            </p>
            <b className={styles.name}>Мы сумели добиться:</b>
            <ul>
              <li>
                Высокой стабильности. Все поставки мебели выполняются точно в срок и в соответствии
                с пожеланиями наших клиентов уже более 10 лет. Вне зависимости от кризисов и других
                проблем с экономикой, мы делаем все необходимое, чтобы сделать дома покупателей
                уютнее.
              </li>
              <li>
                Надежных связей с лучшими поставщиками. Наша компания сотрудничает с лучшими
                поставщиками материалов и фурнитуры, которые помогают нам создать продукцию
                безопасную, красивую и удобную в использовании.
              </li>
              <li>
                Наши опытные и квалифицированные специалисты помогут Вам в этом. Так же в наших
                магазинах можно подобрать мягкую мебель от бюджетного варианта до премиум класса
                включительно.
              </li>
              <li>
                Создания обширного каталога качественной продукции. На нашем сайте woodmaster73.ru
                вы сможете найти качественную мебель по доступным ценам. Мы предлагаем изделия,
                сочетающие в себе современные технологии и продуманный дизайн.
              </li>
            </ul>
          </div>
          <div className={styles.row}>
            <div className={styles.item}>
              <img src="/images/icons/preim.png" alt="" />
              <div className={styles.itemText}>
                <b>Доставка</b>
                <p>
                  Доставка мебели по Ульяновску <span>бесплатно!</span>
                </p>
              </div>
            </div>
            <div className={styles.item}>
              <img src="/images/icons/preim2.png" alt="" />
              <div className={styles.itemText}>
                <b>Сборка</b>
                <p>
                  Выезд профессионалов по сборке мебели <span>на дом</span>!
                </p>
              </div>
            </div>
            <div className={styles.item}>
              <img src="/images/icons/preim3.png" alt="" />
              <div className={styles.itemText}>
                <b>Покупка в рассрочку</b>
                <p>
                  Мы доверяем нашим клиентам и даем воплотить мечту в <span>рассрочку</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
        <img src="/images/aboutUsShort_img.webp" alt="" className={styles.image} />
      </div>
    </section>
  );
}

export default AboutUsShort;
