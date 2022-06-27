let form = document.querySelector('.popup__form');
let userNameForm = form.querySelector('.popup__input_type_user-name');
let userDescForm = form.querySelector('.popup__input_type_user-desc');

let userName = document.querySelector('.profile__user-name');
let userDesc = document.querySelector('.profile__user-description');


/* Открытие попапа */
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');

function openPopup() {
    userNameForm.value = userName.textContent;
    userDescForm.value = userDesc.textContent;
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);

/* Закрытие попапа */
const closeButton = document.querySelector('.popup__close-btn');

function closePopup() {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

/* Изменение профиля */

function editProfile(evt) {
    evt.preventDefault();
    userName.textContent = userNameForm.value;
    userDesc.textContent = userDescForm.value;
    closePopup();
}

form.addEventListener('submit', editProfile);