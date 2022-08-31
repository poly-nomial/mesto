export class Card {
    constructor(card, templateSelector, openPopupFunction) {
        this._name = card.name;
        this._link = card.link;
        this._templateSelector = templateSelector;
        this._openPopupFunction = openPopupFunction;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
        return cardElement;
    }

    _toggleActiveLike(evt) {
        evt.target.classList.toggle('place__like_active');
    }

    _deleteCard(evt) {
        evt.target.closest('.place').remove();
        evt.target.closest('.place').innerHTML = '';
    }
    
    _setEventListeners() {
        this._element.querySelector('.place__like').addEventListener('click', (evt) => this._toggleActiveLike(evt));
        this._element.querySelector('.place__delete-button').addEventListener('click', (evt) => this._deleteCard(evt));
        this._placepic.addEventListener('click', () => this._openPopupFunction(this._name, this._link))
    }

    _createCard() {
        this._element = this._getTemplate();
        this._placepic = this._element.querySelector('.place__pic');
        this._placepic.setAttribute('src', this._link);
        this._placepic.setAttribute('alt', this._name);
        this._element.querySelector('.place__name').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}