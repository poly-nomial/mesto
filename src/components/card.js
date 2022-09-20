export class Card {
    constructor(
        card, 
        templateSelector, 
        openPhotoPopupFunction, 
        openConfirmationPopupFunction, 
        deleteCardFunction,
        updateLikeFunction,
        userId
        ) {
        this._name = card.name;
        this._link = card.link;
        this.cardId = card._id;
        this._ownerId = card.owner._id;
        this._userId = userId;
        this._usersLiked = card.likes;
        this._numberOfLikes = card.likes.length;
        this._templateSelector = templateSelector;
        this._openImagePopup = openPhotoPopupFunction;
        this._openConfirmationPopup = openConfirmationPopupFunction;
        this._deleteCard = deleteCardFunction;
        this._updateLike = updateLikeFunction;
        this.deleteCardFromDOM = this.deleteCardFromDOM.bind(this);
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
        return cardElement;
    }

    _toggleLike(evt) {
        this._updateLike(evt, this);
    }

    setNewLikes(evt, likesArray) {
        evt.target.classList.toggle('place__like_active');
        evt.target.nextElementSibling.textContent = likesArray.length;
    }
    
    _setEventListeners() {
        this._likeButton.addEventListener('click', (evt) => this._toggleLike(evt));
        this._deleteButton.addEventListener('click', () => {
            const action = () => {this._deleteCard(this)};
            this._openConfirmationPopup(action);
        });
        this._placePic.addEventListener('click', () => this._openImagePopup(this._name, this._link))
    }

    createCard() {
        this._element = this._getTemplate();
        this._place = this._element.querySelector('.place');
        this._deleteButton = this._place.querySelector('.place__delete-button');
        if (this._userId != this._ownerId) {
            this._deleteButton.remove();
        }
        this._placePic = this._element.querySelector('.place__pic');
        this._likesCounter = this._element.querySelector('.place__number-of-likes');
        this._placePic.setAttribute('src', this._link);
        this._placePic.setAttribute('alt', this._name);
        this._element.querySelector('.place__name').textContent = this._name;
        this._likeButton = this._place.querySelector('.place__like');
        this._likesCounter.textContent = this._numberOfLikes;
        if (this._usersLiked.some(user => user._id === this._userId)) {
            this._likeButton.classList.add('place__like_active');
        }
        this._place.setAttribute('id', this.cardId);
        this._setEventListeners();
        return this._element;
    }

    deleteCardFromDOM() {
        this._place.remove();
    }
}