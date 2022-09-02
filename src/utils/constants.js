import londonImage from "../images/places/london.jpg";
import parisImage from "../images/places/paris.jpg";
import pragueImage from "../images/places/prague.jpg";
import stpetersburgImage from "../images/places/st-petersbutg.jpg";
import tokioImage from "../images/places/tokio.jpg";
import vancouverImage from "../images/places/vancouver.jpg";

export const initialCards = [
    {
        name: 'Лондон',
        link: londonImage
    },

    {
        name: 'Париж',
        link: parisImage
    },

    {
        name: 'Прага',
        link: pragueImage
    },

    {
        name: 'Санкт-Петербург',
        link: stpetersburgImage
    },

    {
        name: 'Токио',
        link: tokioImage
    },

    {
        name: 'Ванкувер',
        link: vancouverImage
    },
];

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

export const profileEditButton = document.querySelector('.profile__edit-button');
export const photoAddButton = document.querySelector('.profile__add-button');