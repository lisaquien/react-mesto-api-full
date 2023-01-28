import React, {useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../utils/auth';

export default function Login({ handleLogin, onRegistration, setRegistrationStatus }) {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleAuthSubmit(e) {
    e.preventDefault();
  
    if(!email || !password) {
      return;

    } else {
      auth.authorize({ password, email })
        .then((res) => {
          if(res) {
            localStorage.setItem('token', res.token);
            if(res.token) {
              setEmail('');
              setPassword('');
              handleLogin();
              history.push('/main');
            }
          }
        })
      .catch(err => {
        setRegistrationStatus(false);
        onRegistration();
        console.log(`Ошибка: ${err}.`)
      });
    }
  }

  return(
    <div className="register">
      <div className="register__container">
        <form className="form form_type_register" onSubmit={handleAuthSubmit}>
          <div className="form__content">
            <h2 className="form__title form__title_type_register">Вход</h2>
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
              <button className="form__button form__button_type_register">Войти</button>
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  )
}