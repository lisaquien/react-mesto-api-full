import React, { useRef } from "react";
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatar.current.value
    });

    e.target.reset();
  }

  return (
    <PopupWithForm name="change-avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        type="url"
        id="avatar-input"
        className="form__input form__input_element_avatar"
        name="avatar"
        ref={avatar}
        placeholder="Ссылка на картинку"
        required={true}
      />
      <span className="form__input-error avatar-input-error"></span>
    </PopupWithForm>
  )
}