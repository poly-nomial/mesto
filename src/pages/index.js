import './index.css';
import { Card } from "../components/card.js";
import { formValidator } from "../components/formValidator.js";
import { PopupWithImage } from "../components/popupWithImage.js";
import { PopupWithForm } from "../components/popupWithForm.js";
import { UserInfo } from "../components/userInfo.js";
import { Section } from "../components/section.js";
import {
    initialCards,
    selectors,
    userNameInput,
    userDescInput,
    placeNameInput,
    placeLinkInput,
    profileEditButton,
    photoAddButton
} from "../utils/constants.js";






const popupAddPlaceValidation = new formValidator(selectors, document.querySelector('.popup_type_add-place').querySelector(selectors.formSelector));

const popupEditProfileValidation = new formValidator(selectors, document.querySelector('.popup_type_edit-profile').querySelector(selectors.formSelector));

const userProfile = new UserInfo('.profile__user-name', '.profile__user-description');

const cardSection = new Section({ items: initialCards, renderer: (item) => {
    cardSection.addItem(createCard(item));
}}, '.places');

const photoViewPopup = new PopupWithImage('.popup_type_photo-view');
const profilePopup = new PopupWithForm('.popup_type_edit-profile', (evt) => {
    evt.preventDefault();
    userProfile.setUserInfo(profilePopup.getInputValues());
    profilePopup.close();
});
const newPlacePopup = new PopupWithForm('.popup_type_add-place', (evt) => {
    evt.preventDefault();
    const newPlaceInputs = newPlacePopup.getInputValues();
    const addedCard = [
        {
        name: newPlaceInputs[0],
        link: newPlaceInputs[1],
        }
    ];
    cardSection.items = addedCard;
    cardSection.renderItems();
    newPlacePopup.close();
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
function createCard(cardInfo) {
    const newCard = new Card(cardInfo, '#place-template', openPhotoPopup);
    const cardElement = newCard.createCard();
    return cardElement;
}
cardSection.renderItems();
