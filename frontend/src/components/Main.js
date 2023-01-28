import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUserData = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__image-container">
            <img className="profile__avatar" src={currentUserData.avatar} alt="Фото пользователя" onClick={onEditAvatar} />
          </div>
          <div className="profile__content">
            <div className="profile__description">
              <div className="profile__personal-info">
                <h1 className="profile__name">{currentUserData.name}</h1>
                <button className="profile__button profile__button_type_edit" onClick={onEditProfile} aria-label="Кнопка Редактировать профиль"></button>
              </div>
              <p className="profile__about">{currentUserData.about}</p>
            </div>
            <button className="profile__button profile__button_type_add" onClick={onAddPlace} aria-label="Кнопка Добавить фото"></button>
          </div>
        </div>
      </section>
      <section className="elements">
        <ul className="cards">
          {cards.map(card => {
              return (<Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />)
            })
          }
        </ul>
      </section>
    </main>
  )
}