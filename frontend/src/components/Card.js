import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUserData = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUserData._id;
  const isLiked = card.likes.some(item => item === currentUserData._id);

  const cardDeleteButtonClassName = (
    `card__button_type_remove ${isOwn ? 'card_button_type_remove_visible' : 'card_button_type_remove_hidden'}`
  );

  const cardLikeButtonClassName = (
    `card__button_type_like ${isLiked ? 'card__button_type_like_active' : ''}`
  )

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="card__panel">
        <p className="card__placename">{card.name}</p>
        <div className="card__like-container">
          <button className={`card__button ${cardLikeButtonClassName}`} aria-label="Кнопка Лайк фото" onClick={handleLikeClick}></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
        <button className={`card__button ${cardDeleteButtonClassName}`} aria-label="Кнопка Удалить фото" onClick={handleDeleteClick}></button>
      </div>
    </li>
  )
}