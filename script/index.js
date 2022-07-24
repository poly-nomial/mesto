const placeTemplate = document.querySelector('#place-template').content;

const popupList = Array.from(document.querySelectorAll('.popup'));

const popupProfileForm = document.querySelector('[name=profile-form]');
const popupAddPhotoForm = document.querySelector('[name=add-form]');
const userNameForm = document.querySelector('.popup__input_type_user-name');
const userDescForm = document.querySelector('.popup__input_type_user-desc');
const placeNameForm = document.querySelector('.popup__input_type_place-name');
const placeLinkForm = document.querySelector('.popup__input_type_place-link');

const userName = document.querySelector('.profile__user-name');
const userDesc = document.querySelector('.profile__user-description');

const profileEditButton = document.querySelector('.profile__edit-button');
const photoAddButton = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupPhotoView = document.querySelector('.popup_type_photo-view');

const places = document.querySelector('.places');

const popupPhotoViewPhoto = document.querySelector('.popup__photo');
const popupPhotoViewTitle = document.querySelector('.popup__photo-title');

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

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function openProfilePopup() {
    hideErrorMessage(popupEditProfile, userNameForm);
    hideErrorMessage(popupEditProfile, userDescForm);
    userNameForm.value = userName.textContent;
    userDescForm.value = userDesc.textContent;
    openPopup(popupEditProfile);
};

function openAddPopup(){
    hideErrorMessage(popupAddPlace, placeNameForm);
    hideErrorMessage(popupAddPlace, placeLinkForm);
    placeNameForm.value = '';
    placeLinkForm.value = '';
    openPopup(popupAddPlace);
};

function openPhotoPopup(evt) {
    popupPhotoViewPhoto.setAttribute('src', evt.target.getAttribute('src'));
    const photoTitleText = evt.target.parentElement.querySelector('.place__name').textContent;
    popupPhotoViewPhoto.setAttribute('alt', photoTitleText);
    popupPhotoViewTitle.textContent = photoTitleText;
    openPopup(popupPhotoView);
};

profileEditButton.addEventListener('click', openProfilePopup);
photoAddButton.addEventListener('click', openAddPopup);

/* Закрытие попапов */

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

const setPopupEventListeners = (popupList) => {
    popupList.forEach((popup) => {
        popup.addEventListener('click', function(evt) {
            if ((evt.target.classList.contains('popup')) || (evt.target.classList.contains('popup__close-btn'))) {
                closePopup(popup);
            }
        } );
    })
}

const setDocumentEventListener = () => {
    document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            popupList.forEach((popup) => {
                closePopup(popup);
            })
        };
    })
};

setDocumentEventListener();
setPopupEventListeners(popupList);


/* Изменение профиля */

function editProfile(evt) {
    evt.preventDefault();
    userName.textContent = userNameForm.value;
    userDesc.textContent = userDescForm.value;
    closePopup(popupEditProfile);
};

popupProfileForm.addEventListener('submit', editProfile);

/* Добавление карточек */

function createCard(name, link) {
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
    const placePic = placeElement.querySelector('.place__pic');
    const placeName = placeElement.querySelector('.place__name');
    placeElement.querySelector('.place__like').addEventListener('click', toggleActiveLike);
    placeElement.querySelector('.place__delete-button').addEventListener('click', deleteCard);
    placePic.addEventListener('click', openPhotoPopup);

    placePic.setAttribute('src', link);
    placePic.setAttribute('alt', name);
    placeName.textContent = name;
    return placeElement;
}

function renderCard(element) {
    places.prepend(element);
}


function addInitialCards() {
    initialCards.forEach(elem => renderCard(createCard(elem.name, elem.link)));
};

addInitialCards();

function addPlace(evt) {
    evt.preventDefault();
    renderCard(createCard(placeNameForm.value, placeLinkForm.value));
    closePopup(popupAddPlace);
}

popupAddPhotoForm.addEventListener('submit', addPlace);

/* Лайки 🐶*/
function toggleActiveLike(evt) {
    evt.target.classList.toggle('place__like_active');
}

/* Удаление карточки */
function deleteCard(evt) {
    const placeItem = evt.target.closest('.place');
    placeItem.remove();
};