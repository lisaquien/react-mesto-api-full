import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from '../utils/auth';

export default function Register({ onRegistration, setRegistrationStatus }) {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    
    auth.register({ password, email })
      .then((res) => {
        if(res) {
          setRegistrationStatus(true);
          onRegistration();
          history.push('/sign-in');
        }
      })
      .catch(err => {
        setRegistrationStatus(false);
        onRegistration();
        console.log(`Ошибка: ${err}.`)
      })
  }

  return(
    <div className="register">
      <div className="register__container">
        <form className="form form_type_register" onSubmit={handleRegisterSubmit}>
          <div className="form__content">
            <h2 className="form__title form__title_type_register">Регистрация</h2>
            <fieldset className="form__fieldset">
              <input
                className="form__input form__input_type_register form__input_element_email"
                name="email"
                type="email"
                placeholder="Email"
                value={email || ''}
                onChange={handleEmailChange}
                required>
              </input>
              <input
                className="form__input form__input_type_register form__input_element_password"
                name="password"
                type="password"
                placeholder="Пароль"
                value={password || ''}
                onChange={handlePasswordChange}
                required>
              </input>
              <button className="form__button form__button_type_register">Зарегистрироваться</button>
            </fieldset>
          </div>
        </form>
        <div className="register__signin">
          <p className="register__login-question">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="register__login-link">Войти</Link>
        </div>
      </div>
    </div> 
  )
}