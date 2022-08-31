import './pages/index.css';
import { Card } from "./script/components/card.js";
import { formValidator } from "./script/components/formValidator.js";
import { PopupWithImage } from "./script/components/popupWithImage.js";
import { PopupWithForm } from "./script/components/popupWithForm.js";
import { UserInfo } from "./script/components/userInfo.js";
import { Section } from "./script/components/section.js";
import {
    initialCards,
    selectors,
    userNameInput,
    userDescInput,
    placeNameInput,
    placeLinkInput,
    profileEditButton,
    photoAddButton
} from "./script/utils/constants.js";






const popupAddPlaceValidation = new formValidator(selectors, document.querySelector('.popup_type_add-place').querySelector(selectors.formSelector));

const popupEditProfileValidation = new formValidator(selectors, document.querySelector('.popup_type_edit-profile').querySelector(selectors.formSelector));

const userProfile = new UserInfo('.profile__user-name', '.profile__user-description');

const photoViewPopup = new PopupWithImage('.popup_type_photo-view');
const profilePopup = new PopupWithForm('.popup_type_edit-profile', (evt) => {
    evt.preventDefault();
    userProfile.setUserInfo(profilePopup._getInputValues());
    profilePopup.close();
});
const newPlacePopup = new PopupWithForm('.popup_type_add-place', (evt) => {
    evt.preventDefault();
    const newPlaceInputs = newPlacePopup._getInputValues();
    const addedCard = {
        name: newPlaceInputs[0].value,
        link: newPlaceInputs[1].value,
    };
    const newCard = new Section({items: addedCard, renderer: () => {
        const card = new Card(addedCard, '#place-template', openPhotoPopup);
        const cardElement = card._createCard();
        newCard.addItem(cardElement);
    }}, '.places');
    newCard.renderItem();
});

// Установка слушателей

photoViewPopup.setEventListeners();
profilePopup.setEventListeners();
newPlacePopup.setEventListeners();
profileEditButton.addEventListener('click', openProfilePopup);
photoAddButton.addEventListener('click', openNewPlacePopup);


// Добавление валидации

 popupAddPlaceValidation.enableValidation();
 popupEditProfileValidation.enableValidation();

// Открытие попапов

function openProfilePopup() {
    let profileInfo = userProfile.getUserInfo();
    userNameInput.value = profileInfo.userName;
    userDescInput.value = profileInfo.userDescription;
    popupEditProfileValidation.hideErrorMessage(userNameInput);
    popupEditProfileValidation.hideErrorMessage(userDescInput);
    popupEditProfileValidation.toggleButtonState();
    profilePopup.open();
    
};

function openNewPlacePopup(){
    popupAddPlaceValidation.hideErrorMessage(placeNameInput);
    popupAddPlaceValidation.hideErrorMessage(placeLinkInput);
    popupAddPlaceValidation.toggleButtonState();
    newPlacePopup.open();
};

const openPhotoPopup = (photoName, photoLink) => {
    photoViewPopup.open(photoName, photoLink);
};

// Добавление карточек
initialCards.forEach(initialCard => {
    const renderedInitialCard = new Section({ item: initialCard, renderer: (item) => {
        const newCard = new Card(item, '#place-template', openPhotoPopup);
        const cardElement = newCard._createCard();
        renderedInitialCard.addItem(cardElement);
    } }, '.places');

    renderedInitialCard.renderItem();
})