export class FormValidator {
    constructor(selectors, formElement) {
        this._inputSelector = selectors.inputSelector;
        this._invalidInputClass = selectors.invalidInputClass;
        this._buttonSelector = selectors.buttonSelector;
        this._inactiveButtonClass = selectors.inactiveButtonClass;
        this._activeErrorClass = selectors.activeErrorClass;
        this._formElement = formElement;
        this._buttonElement = formElement.querySelector(this._buttonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    _hasInvalidInput() {
        return this._inputList.some(elem => {
            return !elem.validity.valid;
        });
    }

    toggleButtonState() {
        if(this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled', true);
        }
    }

    _showErrorMessage(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.popup__${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._activeErrorClass);
        inputElement.classList.add(this._invalidInputClass);
    }

    hideErrorMessage(inputElement) {
        const errorElement = this._formElement.querySelector(`.popup__${inputElement.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(this._activeErrorClass);
        inputElement.classList.remove(this._invalidInputClass);
    }

    resetValidationErrors() {
        this._inputList.forEach(input => {
            this.hideErrorMessage(input);
        })
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showErrorMessage(inputElement, inputElement.validationMessage);
        } else {
            this.hideErrorMessage(inputElement);
        }
    }

    _setEventListeners() {
        this.toggleButtonState();
        this._inputList.forEach(elem => {
            elem.addEventListener('input', () => {
                this._checkInputValidity(elem);
                this.toggleButtonState();
            })
        })
    }

    enableValidation() {
        this._formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        })
        this._setEventListeners();
    }
}