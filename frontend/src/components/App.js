import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import { auth } from '../utils/auth';

export default function App() {  
  const history = useHistory();

  //Все стейты-переменные
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUserData, setLoggedInUserData] = useState({});

  function handleRegistrationStatus(value) {
    setIsRegistrationSuccessful(value);
  }

  function handleLogin() {
    setLoggedIn(true);
  }
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (token) {
        auth.checkToken(token)
          .then((data) => {
            const userData = { email: data.email, ...data};
            setLoggedInUserData(userData);
            setCurrentUser(userData);
            handleLogin();
            history.push('/main');
          })
          .catch(err => console.log(`Ошибка: ${err}.`))
        api.getInitialCards()
          .then(data => {
            setCards(data.reverse());
          })
          .catch(err => console.log(`Ошибка: ${err}.`))
      }
    }
  }, [history, loggedIn])

  function changeStateForEditProfilePopup() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function changeStateForAddPlacePopup() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function changeStateForEditAvatarPopup() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function changeStateForInfoTooltip() {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser({ name, about }) {
    api.editUserInfo({ name, about })
      .then(data => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch(err => console.log(`Ошибка: ${err}.`))
  }

  function handleUpdateAvatar({ avatar }) {
    api.editProfilePicture({ avatar })
      .then(data => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch(err => console.log(`Ошибка: ${err}.`))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item === currentUser._id);

    api.changeLikeState(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })

      .catch(err => console.log(`Ошибка: ${err}.`))
  }

  function handleCardDelete(card) {
    const isOwn = card.owner === currentUser._id;

    if (isOwn) {
      api.removeCard(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
        })
        .catch(err => console.log(`Ошибка: ${err}.`))
    }
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.postNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(err => console.log(`Ошибка: ${err}.`))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} loggedInUserData={loggedInUserData}/>
        <Switch>
          <Route path='/sign-in'>
            <Login handleLogin={handleLogin} onRegistration={changeStateForInfoTooltip} setRegistrationStatus={handleRegistrationStatus} />
          </Route>
          <Route path='/sign-up'>
            <Register onRegistration={changeStateForInfoTooltip} setRegistrationStatus={handleRegistrationStatus} />
          </Route>
          <ProtectedRoute
            path='/main'
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={changeStateForEditAvatarPopup}
            onEditProfile={changeStateForEditProfilePopup}
            onAddPlace={changeStateForAddPlacePopup}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route exact path='/'>
            {loggedIn ? <Redirect to='/main' /> : <Redirect to='sign-in' />}
          </Route>
        </Switch>
        {loggedIn && <Footer />}

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да" isOpen={""} onClose={closeAllPopups} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip name="reg-info" isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isRegistrationSuccessful={isRegistrationSuccessful} />

      </div>
    </CurrentUserContext.Provider>
  )
}