export class Card {
    constructor(card, templateSelector, openPhotoPopupFunction, openConfirmationPopupFunction, likeCardFunction, dislikeCardFunction) {
        this._name = card.name;
        this._link = card.link;
        this._cardId = card._id;
        this._ownerId = card.owner._id;
        this._usersLiked = card.likes;
        this._numberOfLikes = card.likes.length;
        this._templateSelector = templateSelector;
        this._openPopup = openPhotoPopupFunction;
        this._openConfirmationPopup = openConfirmationPopupFunction;
        this._likeCard = likeCardFunction;
        this._dislikeCard = dislikeCardFunction;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
        return cardElement;
    }

    _toggleActiveLike(evt) {
        if (evt.target.classList.contains('place__like_active')) {
            this._dislikeCard(this._cardId)
            .then((data) => {
                evt.target.classList.remove('place__like_active');
                evt.target.nextElementSibling.textContent = data.likes.length;
            })
            .catch((err) => console.log(err));
        } else {
            this._likeCard(this._cardId)
            .then((data) => {
                evt.target.classList.add('place__like_active');
                evt.target.nextElementSibling.textContent = data.likes.length;
            })
            .catch((err) => console.log(err));
        }
    }

    _deleteCard(id) {
        document.getElementById(id).innerHTML = '';
        document.getElementById(id).remove();
    }
    
    _setEventListeners() {
        this._likeButton.addEventListener('click', (evt) => this._toggleActiveLike(evt));
        this._deleteButton.addEventListener('click', () => {
            const action = () => this._deleteCard(this._cardId);
            this._openConfirmationPopup(action);
        });
        this._placepic.addEventListener('click', () => this._openPopup(this._name, this._link))
    }

    createCard(userId) {
        this._element = this._getTemplate();
        this._place = this._element.querySelector('.place');
        this._deleteButton = this._place.querySelector('.place__delete-button');
        if (userId != this._ownerId) {
            this._deleteButton.remove();
        }
        this._placepic = this._element.querySelector('.place__pic');
        this._likesCounter = this._element.querySelector('.place__number-of-likes');
        this._placepic.setAttribute('src', this._link);
        this._placepic.setAttribute('alt', this._name);
        this._element.querySelector('.place__name').textContent = this._name;
        this._likeButton = this._place.querySelector('.place__like');
        this._likesCounter.textContent = this._numberOfLikes;
        this._usersLiked.forEach(user => {
            if (user._id === userId) {
                this._likeButton.classList.add('place__like_active');
            }
        })
        this._place.setAttribute('id', this._cardId);
        this._setEventListeners();
        return this._element;
    }
}