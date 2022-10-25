import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendMail } from '../../http/productsAPI';
import styles from './CallForm.module.scss';

function CallForm() {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');

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

      sendMail(formData);
      setFormName('');
      setFormPhone('');

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

  return (
    <section id="order" className={styles.callform}>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <h2 className={styles.title}>Оставьте заявку</h2>
          <p className={styles.subtitle}>Мы свяжемся с вами в течении нескольких минут</p>
        </div>
        <div className={styles.body}>
          <form action="submit">
            <input
              id="focus-input"
              className={!formNameValid && styles.error}
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="* Ваше имя:"
              type="text"
            />
            <input
              className={!formPhoneValid && styles.error}
              value={formPhone}
              onChange={handlePhoneInput}
              onKeyDown={handlePhoneKeyDown}
              onPaste={handlePhonePaste}
              placeholder="* Телефон:"
              type="tel"
              maxLength={18}
            />
            <button onClick={handleSendRequest}>Отправить</button>
          </form>
          <div className={styles.contract}>
            <p>✔ </p>
            <Link to="/agreement">Ознакомлен с пользовательским соглашением</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallForm;
