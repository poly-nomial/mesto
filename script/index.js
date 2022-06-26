/* Изменение плейсхолдеров формы */
let userName = document.querySelector('.profile__user-name');
let userDesc = document.querySelector('.profile__user-description');

let userNameForm = document.querySelector('.popup__input_user-name');
let userDescForm = document.querySelector('.popup__input_user-desc');

userNameForm.value = userName.textContent;
userDescForm.value = userDesc. textContent;

/* Открытие попапа */
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');

function openPopup() {
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
let saveButton = document.querySelector('.popup__save-btn');

function editProfile() {
    userName.textContent = `${userNameForm.value}`;
    userDesc.textContent = `${userDescForm.value}`;
    closePopup();
}

saveButton.addEventListener('click', editProfile);