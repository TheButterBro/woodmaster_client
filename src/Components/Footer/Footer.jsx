import React, { useState } from 'react';
import styles from './Footer.module.scss';

function Footer() {
  const [isUpload, setIsUpload] = useState(false);
  const handleUploadFile = (e) => {
    if (e.target.value) {
      setIsUpload(true);
    } else {
      setIsUpload(false);
    }
  };

  const handleScrollTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.bodyBack}>
          <div className={styles.bodyGradient}>
            <div className={styles.body}>
              <div className={styles.content}>
                <div className={styles.phone}>
                  <div className={styles.text}>
                    <a href="tel:+7 (927) 805-46-89">+7 (927) 805-46-89</a>
                  </div>
                  <div className={styles.icon}>
                    <img src="/images/icons/phone.png" alt="" />
                  </div>
                </div>
                <div className={styles.email}>
                  <div className={styles.text}>
                    <b>Напишите нам</b>
                    <a href="/#">woodmaster73@bk.ru</a>
                  </div>
                  <div className={styles.icon}>
                    <img src="/images/icons/mail.png" alt="" />
                  </div>
                </div>
                <div className={styles.social}>
                  <div className={styles.text}>
                    <b>Мы в социальных сетях</b>
                    <div className={styles.icons}>
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
                  <div className={styles.icon}>
                    <img src="/images/icons/mail.png" alt="" />
                  </div>
                </div>
              </div>
              <div className={styles.form}>
                <p className={styles.title}>
                  Задайте вопрос, наши специалисты свяжутся с вами в ближайшее время
                </p>
                <form action="submit">
                  <input placeholder="*Ваше имя:" type="text" />
                  <input placeholder="*Эл. почта:" type="email" />
                  <input placeholder="*Телефон:" type="text" />
                  <div className={styles.field__wrapper}>
                    <input
                      onChange={handleUploadFile}
                      name="file"
                      type="file"
                      id="field__file-2"
                      className={styles.field__file}
                      multiple
                    />
                    <label className={styles.field__fileWrapper} htmlFor="field__file-2">
                      <div className={styles.field__fileFake}>
                        {!isUpload
                          ? 'Вы можете добавить не более 1 файла:'
                          : 'Файл успешно загружен'}
                      </div>
                      <div className={styles.field__fileButton}>Выбрать</div>
                    </label>
                  </div>
                  <p>Опишите вопрос, при желании:</p>
                  <textarea name="comm" id="" cols="30" rows="10"></textarea>
                  <input type="submit" value="Задать вопрос" className={styles.button} />
                </form>
                <div className={styles.contract}>
                  <p>✔ </p>
                  <a href="/#">Ознакомлен с пользовательским соглашением</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div onClick={handleScrollTop} className={styles.buttonWrapper}>
          <button className={styles.button}>
            <img src="/images/icons/arrow_top.svg" alt="" className={styles.arrow} />
          </button>
          <p className={styles.text}>Вернуться наверх</p>
        </div>
        <div className={styles.info}>
          <b>Copyright © 2021 - 2022</b>
          <b>СТРУЕВА ТАТЬЯНА ВЛАДИМИРОВНА (ИП)</b>
          <span>
            prod. <a href="/#"> Максим Лянка</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
