import './index.css';
import { Card } from "../components/card.js";
import { PopupWithForm } from "../components/popupWithForm.js";
import { Section } from "../components/section.js";
import {
    userNameInput,
    userDescInput,
    profileEditButton,
    photoAddButton,
    avatarEditButton,
    api,
    popupAddPlaceValidation,
    popupEditProfileValidation,
    popupNewAvatarValidation,
    userProfile,
    photoViewPopup,
    confirmationPopup,
} from "../utils/constants.js";

const cardSection = new Section({ items: [], renderer: () => {} }, '.places');

const profilePopup = new PopupWithForm('.popup_type_edit-profile', (evt) => {
    evt.preventDefault();
    renderLoading(true, profilePopup.button);
    const inputValues = profilePopup.getInputValues();
    api.editUserInfo(inputValues)
        .then(data => {
            userProfile.setUserInfo([data.name, data.about, data.avatar, data._id]);
            profilePopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => renderLoading(false, profilePopup.button));
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
            cardSection.renderer = 
            cardSection.renderItems(); //addItem вызывается внутри рендерера
            newPlacePopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => renderLoading(false, newPlacePopup.button));
});

const newAvatarPopup = new PopupWithForm('.popup_type_change-avatar', (evt) => {
    evt.preventDefault();
    renderLoading(true, newAvatarPopup.button);
    const [newLink] = newAvatarPopup.getInputValues();
    api.updateAvatar(newLink)
        .then(data => {
            userProfile.setUserInfo([data.name, data.about, data.avatar, data._id]);
            newAvatarPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => renderLoading(false, newAvatarPopup.button));
})


// Загрузка информации с сервера

function loadServerData() {
    api.getUserInfo()
        .then(data => {
            userProfile.setUserInfo([data.name, data.about, data.avatar, data._id]);
        })
        .then(() => {
            api.getCardsFromServer()
            .then(data => {
                data.reverse();
                cardSection.items = data;
                cardSection.renderer = (item) => {
                    cardSection.addItem(createCard(item));
                }
                cardSection.renderItems();
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err))
}

loadServerData();



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
    const profileInfo = userProfile.getUserInfo();
    userNameInput.value = profileInfo.name;
    userDescInput.value = profileInfo.about;
    popupEditProfileValidation.resetValidationErrors();
    popupEditProfileValidation.toggleButtonState();
    profilePopup.open();
    
};

function openNewPlacePopup(){
    popupAddPlaceValidation.resetValidationErrors();
    popupAddPlaceValidation.toggleButtonState();
    newPlacePopup.open();
};

const openPhotoPopup = (photoName, photoLink) => {
    photoViewPopup.open(photoName, photoLink);
};

const openConfirmationPopup = (handleConfirm) => {
    confirmationPopup.setNewConfirmedAction(handleConfirm);
    confirmationPopup.open();
}

function openNewAvatarPopup() {
    popupNewAvatarValidation.resetValidationErrors();
    popupNewAvatarValidation.toggleButtonState();
    newAvatarPopup.open();
}



// Добавление карточек
function createCard(cardInfo) {
    const newCard = new Card(cardInfo, '#place-template', openPhotoPopup, openConfirmationPopup, deleteCard, updateLike, userProfile.userId);
    const cardElement = newCard.createCard();
    return cardElement;
}

// Удаление карточек
function deleteCard(Card) {
    api.deleteCard(Card.cardId)
        .then(() => Card.deleteCardFromDOM())
        .catch((err) => console.log(err));
}

// Лайки
const likeCard = (cardId) => {
    return api.likeCard(cardId);
}

const dislikeCard = (cardId) => {
    return api.dislikeCard(cardId);
}

const updateLike = (evt, Card) => {
    if (evt.target.classList.contains('place__like_active')) {
        dislikeCard(Card.cardId)
        .then((data) => {
            evt.target.classList.remove('place__like_active');
            evt.target.nextElementSibling.textContent = data.likes.length;
        })
        .catch((err) => console.log(err));
    } else {
        likeCard(Card.cardId)
        .then((data) => {
            evt.target.classList.add('place__like_active');
            evt.target.nextElementSibling.textContent = data.likes.length;
        })
        .catch((err) => console.log(err));
    }
}

// Загрузка
function renderLoading(isLoading, buttonElement) {
    buttonElement.textContent = isLoading ? "Сохранение…" : "Сохранить";
}
