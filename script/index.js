const profileForm = document.querySelector('[name=profile-form]');
const addForm = document.querySelector('[name=add-form]');
const userNameForm = document.querySelector('.popup__input_type_user-name');
const userDescForm = document.querySelector('.popup__input_type_user-desc');
const placeNameForm = document.querySelector('.popup__input_type_place-name');
const placeLinkForm = document.querySelector('.popup__input_type_place-link');

const userName = document.querySelector('.profile__user-name');
const userDesc = document.querySelector('.profile__user-description');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupPhotoView = document.querySelector('.popup_type_photo-view');

const closeAddPlaceButton = popupAddPlace.querySelector('.popup__close-btn');
const closeEditProfileButton = popupEditProfile.querySelector('.popup__close-btn');
const closePhotoButton = popupPhotoView.querySelector('.popup__close-btn');

const places = document.querySelector('.places');

const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoTitle = document.querySelector('.popup__photo-title');

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

/* Открытие попапов */


function openProfilePopup() {
    userNameForm.value = userName.textContent;
    userDescForm.value = userDesc.textContent;
    popupEditProfile.classList.add('popup_opened');
};

function openAddPopup(){
    placeNameForm.value = '';
    placeLinkForm.value = '';
    popupAddPlace.classList.add('popup_opened');
};

function openPhotoPopup(evt) {
    popupPhoto.setAttribute('src', evt.target.getAttribute('src'));
    const photoTitleElement = evt.target.parentElement.querySelector('.place__name').textContent;
    popupPhoto.setAttribute('alt', photoTitleElement);
    popupPhotoTitle.textContent = photoTitleElement;
    popupPhotoView.classList.add('popup_opened');
};

editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', openAddPopup);

/* Закрытие попапов */

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

closeEditProfileButton.addEventListener('click', () => closePopup(popupEditProfile));
closeAddPlaceButton.addEventListener('click', () => closePopup(popupAddPlace));
closePhotoButton.addEventListener('click', () => closePopup(popupPhotoView));

/* Изменение профиля */

function editProfile(evt) {
    evt.preventDefault();
    userName.textContent = userNameForm.value;
    userDesc.textContent = userDescForm.value;
    closePopup(popupEditProfile);
};

profileForm.addEventListener('submit', editProfile);

/* Добавление карточек */

function addCard(name, link) {
    const placeTemplate = document.querySelector('#place-template').content;
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
    const placePic = placeElement.querySelector('.place__pic');
    const placeName = placeElement.querySelector('.place__name');
    placeElement.querySelector('.place__like').addEventListener('click', toggleActiveLike);
    placeElement.querySelector('.place__delete-button').addEventListener('click', deleteCard);
    placeElement.querySelector('.place__pic').addEventListener('click', openPhotoPopup);

    placePic.setAttribute('src', link);
    placePic.setAttribute('alt', name);
    placeName.textContent = name;

    places.prepend(placeElement);
};

function addInitialCards() {
    initialCards.forEach(elem => addCard(elem.name, elem.link));
};

addInitialCards();

function addPlace(evt) {
    evt.preventDefault();
    addCard(placeNameForm.value, placeLinkForm.value);
    closePopup(popupAddPlace);
}

addForm.addEventListener('submit', addPlace);

/* Лайки 🐶*/
function toggleActiveLike(evt) {
    evt.target.classList.toggle('place__like_active');
}

/* Удаление карточки */
function deleteCard(evt) {
    const placeItem = evt.target.closest('.place');
    placeItem.remove();
};