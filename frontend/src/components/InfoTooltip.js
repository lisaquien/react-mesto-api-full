import successIcon from '../images/success-icon.svg';
import failIcon from '../images/fail-icon.svg';

export default function InfoTooltip({ name, isOpen, onClose, isRegistrationSuccessful }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button className="popup__close-icon" aria-label="Кнопка Закрыть" onClick={onClose}></button>
        <img className="popup__icon" src={isRegistrationSuccessful ? successIcon : failIcon}></img>
        <p className="popup__message">{isRegistrationSuccessful ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
      </div>
    </div>
  )
}