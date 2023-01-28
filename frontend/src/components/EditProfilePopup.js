import React, {useState, useEffect} from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUserData = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUserData.name);
    setDescription(currentUserData.about);
  }, [currentUserData, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        type="text"
        id="name-input"
        className="form__input form__input_element_name"
        name="name"
        value={name || ''}
        onChange={handleNameChange}
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        required={true}
      />
      <span className="form__input-error name-input-error"></span>
      <input type="text"
        id="description-input"
        className="form__input form__input_element_about"
        name="about"
        value={description || ''}
        onChange={handleDescriptionChange}
        minLength="2"
        maxLength="200"
        placeholder="Занятие"
        required={true}
      />
      <span className="form__input-error description-input-error"></span>
    </PopupWithForm>
  )
}