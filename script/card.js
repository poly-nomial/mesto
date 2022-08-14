export class Card {
    constructor(card, templateSelector, openPopupFunction) {
        this._name = card.name;
        this._link = card.link;
        this._selector = templateSelector;
        this._openPopupFunction = openPopupFunction;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._selector).content.cloneNode(true);
        return cardElement;
    }

    _toggleActiveLike(evt) {
        evt.target.classList.toggle('place__like_active');
    }

    _deleteCard(evt) {
        evt.target.closest('.place').remove();
    }
    
    _setEventListeners() {
        this._element.querySelector('.place__like').addEventListener('click', (evt) => this._toggleActiveLike(evt));
        this._element.querySelector('.place__delete-button').addEventListener('click', (evt) => this._deleteCard(evt));
        this._element.querySelector('.place__pic').addEventListener('click', () => this._openPopupFunction(this._name, this._link))
    }

    _createCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.place__pic').setAttribute('src', this._link);
        this._element.querySelector('.place__pic').setAttribute('alt', this._link);
        this._element.querySelector('.place__name').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }

    addCard(containerSelector) {
        document.querySelector(containerSelector).prepend(this._createCard());
    }
}