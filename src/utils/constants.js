import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";


export const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    invalidInputClass: 'popup__input_invalid',
    buttonSelector: '.popup__save-btn',
    inactiveButtonClass:  'popup__save-btn_inactive',
    activeErrorClass: 'popup__input-error_active'
};

export const userNameInput = document.querySelector('.popup__input_type_user-name');
export const userDescInput = document.querySelector('.popup__input_type_user-desc');
export const placeNameInput = document.querySelector('.popup__input_type_place-name');
export const placeLinkInput = document.querySelector('.popup__input_type_place-link');
export const avatarLinkInput = document.querySelector('.popup__input_type_avatar-link');

export const profileEditButton = document.querySelector('.profile__edit-button');
export const photoAddButton = document.querySelector('.profile__add-button');
export const avatarEditButton = document.querySelector('.avatar__edit-pic');

export const token = "85ece6ec-ad42-4595-ab64-f4ab4791389f";

export const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/',
    headers: {
        'authorization': token,
        'Content-Type': 'application/json',
    }
})

export const popupAddPlaceValidation = new FormValidator(selectors, document.querySelector('.popup_type_add-place').querySelector(selectors.formSelector));

export const popupEditProfileValidation = new FormValidator(selectors, document.querySelector('.popup_type_edit-profile').querySelector(selectors.formSelector));

export const popupNewAvatarValidation = new FormValidator(selectors, document.querySelector('.popup_type_change-avatar').querySelector(selectors.formSelector));

export const userProfile = new UserInfo('.profile__user-name', '.profile__user-description', '.avatar');

export const photoViewPopup = new PopupWithImage('.popup_type_photo-view');

export const confirmationPopup = new PopupWithConfirmation('.popup_type_confirmation', () => {});

export const user = {};