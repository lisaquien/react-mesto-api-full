import React from "react";

export default function ImagePopup({ card, onClose }) {
  return(
    <div className={`popup popup_type_gallery ${card ? 'popup_opened' : ''}`}>
      <div className="gallery">
        <button className="popup__close-icon" aria-label="Кнопка Закрыть" onClick={onClose}></button>
        <img className="gallery__image" src={card?.link} alt={card?.name} />
        <p className="gallery__name"></p>
      </div>
    </div>
  )
}