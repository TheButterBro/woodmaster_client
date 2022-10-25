import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendMail } from '../../http/productsAPI';
import styles from './Footer.module.scss';

function Footer() {
  const [isUpload, setIsUpload] = useState(false);
  const [thisFile, setThisFile] = useState(null);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formQuestion, setFormQuestion] = useState('');

  const [formNameValid, setFormNameValid] = useState(true);
  const [formPhoneValid, setFormPhoneValid] = useState(true);

  const handleSendRequest = (e) => {
    e.preventDefault();
    if (formName == '' && formPhone.length < 17) {
      setFormNameValid(false);
      setFormPhoneValid(false);
    }
    if (formPhone.length < 17 && formName != '') {
      setFormNameValid(true);
      setFormPhoneValid(false);
    }
    if (formName == '' && formPhone.length >= 17) {
      setFormNameValid(false);
      setFormPhoneValid(true);
    }
    if (formName != '' && formPhone.length >= 17) {
      const formData = new FormData();

      formData.append('name', formName);
      formData.append('phone', formPhone);
      if (formQuestion) {
        formData.append('question', formQuestion);
      }

      sendMail(formData);
      setFormName('');
      setFormPhone('');
      setFormQuestion('');

      setFormNameValid(true);
      setFormPhoneValid(true);
    }
  };
  const PATTERN = /\D/g;

  const getInputNumbersValue = (value) => {
    // return only numbers
    return value.replace(PATTERN, '');
  };

  const handlePhoneInput = (event) => {
    const input = event.target;
    let inputNumbersValue = getInputNumbersValue(input.value);
    let formattedInputValue = '';
    const selectionStart = input.selectionStart;

    if (!inputNumbersValue) {
      return (input.value = '');
    }

    if (input.value.length !== selectionStart) {
      return;
    }

    if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
      // Russian phone number
      if (inputNumbersValue[0] === '9') {
        inputNumbersValue = '7' + inputNumbersValue;
      }

      const firstSymbols = inputNumbersValue[0] === '8' ? '8' : '+7';
      formattedInputValue = firstSymbols + ' ';

      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
    } else {
      // Not Russian phone number
      formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }

    setFormPhone(formattedInputValue);
  };

  const handlePhoneKeyDown = (
    // remove first symbol
    event,
  ) => {
    const input = event.target;
    if (event.key === 'Backspace' && getInputNumbersValue(input.value).length === 1) {
      input.value = '';
    }

    return input;
  };

  const handlePhonePaste = (event) => {
    const pasted = event.clipboardData ?? window['clipboardData'];
    const input = event.target;
    const inputNumbersValue = getInputNumbersValue(input.value);

    if (pasted) {
      const pastedText = pasted.getData('Text');
      if (PATTERN.test(pastedText)) {
        setFormPhone(inputNumbersValue);
      }
    }
  };
  // ВАЛИДАЦИЯ INPUT FILE
  const handlerFileChange = async (event) => {
    if (event.target.value) {
      setIsUpload(true);
    } else {
      setIsUpload(false);
    }

    let file = event.target.files[0];

    let reader = new FileReader();

    reader.onload = function (e) {
      imageExists(e.target.result, function (exists) {
        if (exists) {
          setThisFile(file);
        } else {
          window.alert(
            'Файл не поддерживается. Вы можете использовать только изображения с типами .PNG, .JPG, .JPEG или .WEBP ',
          );
          setIsUpload(false);
          return false;
        }
      });
    };
    reader.readAsDataURL(event.target.files[0]);

    function imageExists(url, callback) {
      let img = new Image();
      img.onload = function () {
        callback(true);
      };
      img.onerror = function () {
        callback(false);
      };
      img.src = url;
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
                  <input
                    className={!formNameValid && styles.error}
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="*Ваше имя:"
                    type="text"
                  />
                  {/* <input placeholder="*Эл. почта:" type="email" /> */}
                  <input
                    className={!formPhoneValid && styles.error}
                    value={formPhone}
                    onChange={handlePhoneInput}
                    onKeyDown={handlePhoneKeyDown}
                    onPaste={handlePhonePaste}
                    placeholder="*Телефон:"
                    type="tel"
                    maxLength={18}
                  />
                  <div className={styles.field__wrapper}>
                    <input
                      onChange={handlerFileChange}
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
                  <textarea
                    value={formQuestion}
                    onChange={(e) => setFormQuestion(e.target.value)}
                    name="comm"
                    id=""
                    cols="30"
                    rows="10"></textarea>
                  <input
                    type="submit"
                    onClick={handleSendRequest}
                    value="Задать вопрос"
                    className={styles.button}
                  />
                </form>
                <div className={styles.contract}>
                  <p>✔ </p>
                  <Link to="/agreement">Ознакомлен с пользовательским соглашением</Link>
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
            prod. <a href="https://t.me/Omyjonson"> Максим Лянка</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
