import './index.css';
import { Card } from "../components/card.js";
import { formValidator } from "../components/formValidator.js";
import { PopupWithImage } from "../components/popupWithImage.js";
import { PopupWithForm } from "../components/popupWithForm.js";
import { PopupWithConfirmation } from "../components/popupWithConfirmation.js";
import { UserInfo } from "../components/userInfo.js";
import { Section } from "../components/section.js";
import { Api } from "../components/api.js";
import {
    selectors,
    userNameInput,
    userDescInput,
    placeNameInput,
    placeLinkInput,
    avatarLinkInput,
    profileEditButton,
    photoAddButton,
    avatarEditButton,
    token
    
} from "../utils/constants.js";


const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/',
    headers: {
        'authorization': token,
        'Content-Type': 'application/json',
    }
})

const popupAddPlaceValidation = new formValidator(selectors, document.querySelector('.popup_type_add-place').querySelector(selectors.formSelector));

const popupEditProfileValidation = new formValidator(selectors, document.querySelector('.popup_type_edit-profile').querySelector(selectors.formSelector));

const popupNewAvatarValidation = new formValidator(selectors, document.querySelector('.popup_type_change-avatar').querySelector(selectors.formSelector));

const userProfile = new UserInfo('.profile__user-name', '.profile__user-description', '.avatar');

const photoViewPopup = new PopupWithImage('.popup_type_photo-view');

const profilePopup = new PopupWithForm('.popup_type_edit-profile', (evt) => {
    evt.preventDefault();
    renderLoading(true, profilePopup.button);
    const inputValues = profilePopup.getInputValues();
    api.editUserInfo(inputValues)
        .then(data => {
            userProfile.setUserInfo([data.name, data.about, data.avatar]);
            renderLoading(false, profilePopup.button);
            profilePopup.close();
        })
        .catch(err => console.log(err));
});

const newPlacePopup = new PopupWithForm('.popup_type_add-place', (evt) => {
    evt.preventDefault();
    renderLoading(true, newPlacePopup.button);
    const newPlaceInputs = newPlacePopup.getInputValues();
    const addedCard = {
        name: newPlaceInputs[0],
        link: newPlaceInputs[1],
        };
    api.postNewCard(addedCard)
        .then(data => {
            cardSection.items = [data];
            cardSection.renderItems();
            renderLoading(false, newPlacePopup.button);
            newPlacePopup.close();
        })
        .catch(err => console.log(err));
});

const newAvatarPopup = new PopupWithForm('.popup_type_change-avatar', (evt) => {
    evt.preventDefault();
    renderLoading(true, newAvatarPopup.button);
    const [newLink] = newAvatarPopup.getInputValues();
    api.updateAvatar(newLink)
        .then(data => {
            userProfile.setUserInfo([data.name, data.about, data.avatar]);
            renderLoading(false, newAvatarPopup.button);
            newAvatarPopup.close();
        })
        .catch(err => console.log(err));
})

const confirmationPopup = new PopupWithConfirmation('.popup_type_confirmation', () => {});

let cardSection;

let userId;

function setUserInfo() {
    api.getUserInfo()
        .then(data => {
            userProfile.setUserInfo([data.name, data.about, data.avatar]);
            userId = data._id;
        })
        .then(() => {
            api.getCardsFromServer()
            .then(data => {
                cardSection = new Section({ items: data, renderer: (item) => {
                    cardSection.addItem(createCard(item));
                }}, '.places');
                cardSection.renderItems();
    })
    .catch(err => console.log(err));
        })
        .catch(err => console.log(err))
}

setUserInfo();



// Установка слушателей

photoViewPopup.setEventListeners();
profilePopup.setEventListeners();
newPlacePopup.setEventListeners();
confirmationPopup.setEventListeners();
newAvatarPopup.setEventListeners();
profileEditButton.addEventListener('click', openProfilePopup);
photoAddButton.addEventListener('click', openNewPlacePopup);
avatarEditButton.addEventListener('click', openNewAvatarPopup);


// Добавление валидации

 popupAddPlaceValidation.enableValidation();
 popupEditProfileValidation.enableValidation();
 popupNewAvatarValidation.enableValidation();

// Открытие попапов

function openProfilePopup() {
    let profileInfo = userProfile.getUserInfo();
    userNameInput.value = profileInfo.name;
    userDescInput.value = profileInfo.about;
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

const openConfirmationPopup = (confirmedAction) => {
    confirmationPopup.confirmedAction = confirmedAction;
    confirmationPopup.open();
}

function openNewAvatarPopup() {
    popupNewAvatarValidation.hideErrorMessage(avatarLinkInput);
    popupNewAvatarValidation.toggleButtonState();
    newAvatarPopup.open();
}



// Добавление карточек
function createCard(cardInfo) {
    const newCard = new Card(cardInfo, '#place-template', openPhotoPopup, openConfirmationPopup, likeCard, dislikeCard);
    const cardElement = newCard.createCard(userId);
    return cardElement;
}

// Лайки
const likeCard = (cardId) => {
    return api.likeCard(cardId);
}

const dislikeCard = (cardId) => {
    return api.dislikeCard(cardId);
}

// Загрузка
function renderLoading(isLoading, buttonElement) {
    buttonElement.textContent = isLoading ? "Сохранение…" : "Сохранить";
}
