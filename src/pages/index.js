import './index.css';
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
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
    user
} from "../utils/constants.js";

const cardSection = new Section((item) => {
    cardSection.addItem(createCard(item));
}, '.places');

const profilePopup = new PopupWithForm('.popup_type_edit-profile', (evt) => {
    evt.preventDefault();
    profilePopup.renderLoading(true);
    const inputValues = profilePopup.getInputValues();
    api.editUserInfo(inputValues)
        .then(data => {
            userProfile.setUserInfo([data.name, data.about, data.avatar, data._id]);
            profilePopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => profilePopup.renderLoading(false));
});

const newPlacePopup = new PopupWithForm('.popup_type_add-place', (evt) => {
    evt.preventDefault();
    newPlacePopup.renderLoading(true);
    const newPlaceInputs = newPlacePopup.getInputValues();
    const addedCard = {
        name: newPlaceInputs[0],
        link: newPlaceInputs[1],
    };
    api.postNewCard(addedCard)
        .then(data => {
            const newCard = createCard(data);
            cardSection.addItem(newCard);
            newPlacePopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => newPlacePopup.renderLoading(false));
});

const newAvatarPopup = new PopupWithForm('.popup_type_change-avatar', (evt) => {
    evt.preventDefault();
    newAvatarPopup.renderLoading(true);
    const [newLink] = newAvatarPopup.getInputValues();
    api.updateAvatar(newLink)
        .then(data => {
            userProfile.setUserInfo([data.name, data.about, data.avatar, data._id]);
            newAvatarPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => newAvatarPopup.renderLoading(false));
})


// Загрузка информации с сервера
function loadServerData() {
    api.getUserInfo()
        .then(data => {
            userProfile.setUserInfo([data.name, data.about, data.avatar]);
            user.id = data._id;
        })
        .then(() => {
            api.getCardsFromServer()
            .then(data => {
                data.reverse();
                cardSection.renderItems(data);
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
    const newCard = new Card(cardInfo, '#place-template', openPhotoPopup, openConfirmationPopup, deleteCard, updateLike, user.id);
    const cardElement = newCard.createCard();
    return cardElement;
}

// Удаление карточек
function deleteCard(card) {
    api.deleteCard(card.cardId)
        .then(() => {
            card.deleteCardFromDOM();
            confirmationPopup.close();
        })
        .catch((err) => console.log(err));
}

// Лайки
const likeCard = (cardId) => {
    return api.likeCard(cardId);
}

const dislikeCard = (cardId) => {
    return api.dislikeCard(cardId);
}

const updateLike = (card) => {
    if (card.isLiked()) {
        dislikeCard(card.cardId)
        .then((data) => {
            card.setNewLikes(data.likes);
        })
        .catch((err) => console.log(err));
    } else {
        likeCard(card.cardId)
        .then((data) => {
            card.setNewLikes(data.likes);
        })
        .catch((err) => console.log(err));
    }
}