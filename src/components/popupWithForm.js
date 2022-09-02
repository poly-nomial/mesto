import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    };

    getInputValues() {
        const inputValues = [];
        for (let i = 0; i < this._inputList.length; i++) {
            inputValues[i] = this._inputList[i].value;
        };
        return inputValues;
    };

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._submitFunction.bind(this));
    };

    close() {
        super.close();
        this._popupForm.reset();
    };
}