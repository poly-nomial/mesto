import { Card } from "./card.js";
import { formValidator } from "./formValidator.js"

const initialCards = [
    {
        name: 'Лондон',
        link: './images/places/london.jpg'
    },

    {
        name: 'Париж',
        link: './images/places/paris.jpg'
    },

    {
        name: 'Прага',
        link: './images/places/prague.jpg'
    },

    {
        name: 'Санкт-Петербург',
        link: './images/places/st-petersbutg.jpg'
    },

    {
        name: 'Токио',
        link: './images/places/tokio.jpg'
    },

    {
        name: 'Ванкувер',
        link: './images/places/vancouver.jpg'
    },
];

const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    invalidInputClass: 'popup__input_invalid',
    buttonSelector: '.popup__save-btn',
    inactiveButtonClass:  'popup__save-btn_inactive',
    activeErrorClass: 'popup__input-error_active'
};

const popupList = Array.from(document.querySelectorAll('.popup'));

const popupProfileForm = document.querySelector('[name=profile-form]');
const popupAddPhotoForm = document.querySelector('[name=add-form]');
const userNameInput = document.querySelector('.popup__input_type_user-name');
const userDescInput = document.querySelector('.popup__input_type_user-desc');
const placeNameInput = document.querySelector('.popup__input_type_place-name');
const placeLinkInput = document.querySelector('.popup__input_type_place-link');

const userName = document.querySelector('.profile__user-name');
const userDesc = document.querySelector('.profile__user-description');

const profileEditButton = document.querySelector('.profile__edit-button');
const photoAddButton = document.querySelector('.profile__add-button');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupAddPlaceValidation = new formValidator(selectors, popupAddPlace.querySelector(selectors.formSelector));

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupEditProfileValidation = new formValidator(selectors, popupEditProfile.querySelector(selectors.formSelector));

const popupPhotoView = document.querySelector('.popup_type_photo-view');

const popupPhotoViewPhoto = document.querySelector('.popup__photo');
const popupPhotoViewTitle = document.querySelector('.popup__photo-title');

/* Открытие попапов */

function handleEscPress(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscPress);
}

function openProfilePopup() {
    userNameInput.value = userName.textContent;
    userDescInput.value = userDesc.textContent;
    popupEditProfileValidation.hideErrorMessage(userNameInput);
    popupEditProfileValidation.hideErrorMessage(userDescInput);
    popupEditProfileValidation.toggleButtonState();
    openPopup(popupEditProfile);
};

function openAddPopup(){
    popupAddPlaceValidation.hideErrorMessage(placeNameInput);
    popupAddPlaceValidation.hideErrorMessage(placeLinkInput);
    placeNameInput.value = '';
    placeLinkInput.value = '';
    popupAddPlaceValidation.toggleButtonState();
    openPopup(popupAddPlace);
};

const openPhotoPopup = (name, link) => {
    popupPhotoViewPhoto.setAttribute('src', link);
    popupPhotoViewPhoto.setAttribute('alt', name);
    popupPhotoViewTitle.textContent = name;
    openPopup(popupPhotoView);
};

profileEditButton.addEventListener('click', openProfilePopup);
photoAddButton.addEventListener('click', openAddPopup);

/* Закрытие попапов */

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscPress);
};

const setPopupEventListeners = (popupList) => {
    popupList.forEach((popup) => {
        popup.addEventListener('click', function(evt) {
            if ((evt.target.classList.contains('popup')) || (evt.target.classList.contains('popup__close-btn'))) {
                closePopup(popup);
            }
        } );
    })
}

setPopupEventListeners(popupList);


/* Изменение профиля */

function editProfile(evt) {
    evt.preventDefault();
    userName.textContent = userNameInput.value;
    userDesc.textContent = userDescInput.value;
    closePopup(popupEditProfile);
};

popupProfileForm.addEventListener('submit', editProfile);

/**
 * Добавление карточек
 */

function createCard(card, templateSelector, containerSelector, openPopupFunction) {
    return new Card(card, templateSelector, containerSelector, openPopupFunction)
}

initialCards.forEach(elem => {
    createCard(elem, '#place-template', '.places', openPhotoPopup).addCard();
});

function addPlace(evt) {
    evt.preventDefault();
    createCard({name: placeNameInput.value, link: placeLinkInput.value}, '#place-template', openPhotoPopup).addCard('.places');
    closePopup(popupAddPlace);
}

popupAddPhotoForm.addEventListener('submit', addPlace);

/**
 * Добавление валидации 
 */

popupAddPlaceValidation.enableValidation();
popupEditProfileValidation.enableValidation();