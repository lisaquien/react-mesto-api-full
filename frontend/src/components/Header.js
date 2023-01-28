import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../images/header-logo.svg';

export default function Header({ loggedInUserData, setLoggedIn, loggedIn }) {
  const history = useHistory();
  const location = useLocation();

  
  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Логотип проекта mesto russia" />
        <div className="header__navigation-links">
          {loggedIn && <p className="header__navigation-link">{loggedInUserData.email}</p>}
          {loggedIn && <Link to="/sign-in" className="header__navigation-link" onClick={handleSignOut}>Выйти</Link>}
          {location.pathname === '/sign-in' && <Link to="/sign-up" className="header__navigation-link">Регистрация</Link>}
          {location.pathname === '/sign-up' && <Link to="/sign-in" className="header__navigation-link">Войти</Link>}
         </div>
      </div>
    </header>
  )
}