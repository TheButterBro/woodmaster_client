import React from 'react';
import { useState } from 'react';
import CallForm from '../../Business/CallForm/CallForm';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { createPermission } from '../../http/productsAPI';
import styles from './Agreement.module.scss';

function Agreement() {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenImage = () => {
    setIsOpened(!isOpened);
  };

  const handleCreatePass = () => {
    let formData = new FormData();

    formData.append('password', 'URAauNJWOZ');
    createPermission(formData);
  };
  return (
    <>
      <Header />
      <CallForm />
      <section className={styles.agreement}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h4>Пользовательское соглашение</h4>
            <p>Я согласен(на) на обработку моих персональных данных</p>
            <p>
              Настоящим Я, действуя своей волей и в своем интересе, при размещении (вводе) своих
              персональных данных на Интернет сайте ____ общества с ограниченной ответственностью
              _________ (ИНН_________, ОГРН__________, далее - Оператор) подтверждаю свое согласие
              на обработку указанных мной персональных данных Оператором в целях предложения мне
              услуг, новых услуг, предлагаемых Оператором, в целях проведения опросов,
              анкетирования, рекламных и маркетинговых исследований в отношении услуг,
              предоставляемых Оператором, в том числе путем осуществления прямых контактов со мною
              посредством средств связи, указанных мной на настоящем сайте.Настоящее право
              (согласие) предоставляется на осуществление любых действий в отношении моих
              персональных данных, которые необходимы и желаемы для достижения вышеуказанных целей,
              включая, без ограничения, сбор, систематизацию, накопление, хранение, уточнение
              (обновление, изменение), использование, передачу, обезличивание, блокирование и
              уничтожение персональных данных, под которыми понимаются все данные, указанные мной на
              настоящем сайте. Настоящим подтверждаю, что уведомлен о том, что обработка
              персональных данных осуществляется Оператором любым способом, в том числе как с
              использованием средств автоматизации (включая программное обеспечение), так и без
              использования средств автоматизации (с использованием различных материальных
              носителей, включая бумажные носители).
            </p>
          </div>
          <div className={styles.images}>
            <img src="/images/aboutUsRight_img.jpg" alt="" />
          </div>
        </div>
        <button onClick={handleCreatePass}>Создать</button>
      </section>
      <Footer />
    </>
  );
}

export default Agreement;
