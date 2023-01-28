import React, { useState, useEffect } from "react";
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [placename, setPlacename] = useState('');
  const [link, setLink] = useState('');

  function handlePlacenameChange(e) {
    setPlacename(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onAddPlace({
      name: placename,
      link
    });
  }

  useEffect(() => {
    setPlacename('');
    setLink('')
  }, [isOpen]);

  return (
    <PopupWithForm name="add" title="Новое место" buttonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        type="text"
        id="placename-input"
        className="form__input form__input_element_placename"
        name="name"
        value={placename}
        onChange={handlePlacenameChange}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required={true}
      />
      <span className="form__input-error placename-input-error"></span>
      <input
        type="url"
        id="link-input"
        className="form__input form__input_element_link"
        name="link"
        value={link}
        onChange={handleLinkChange}
        placeholder="Ссылка на картинку"
        required={true}
      />
      <span className="form__input-error link-input-error"></span>
    </PopupWithForm>
  )
}