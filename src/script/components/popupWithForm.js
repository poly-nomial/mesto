import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._popupForm = this._popup.querySelector('.popup__form');
    };

    _getInputValues() {
        const inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        return inputList;
    };

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if ((evt.target.classList.contains('popup')) || (evt.target.classList.contains('popup__close-btn'))) {
                this.close();
            }
        } );
        this._popupForm.addEventListener('submit', this._submitFunction.bind(this));
    };

    close() {
        this._popup.classList.remove('popup_opened');
        this._getInputValues().forEach(input => {
            input.value = '';
        });
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    };
}