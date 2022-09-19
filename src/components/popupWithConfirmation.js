import { Popup } from "./popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirmFunction) {
        super(popupSelector);
        this.handleConfirm = handleConfirmFunction;
        this._executeConfirmedAction = this.executeConfirmedAction.bind(this);
        this.button = this._popup.querySelector('.popup__save-btn');
    }

    setNewConfirmedAction(action) {
        this.handleConfirm = action;
    }

    executeConfirmedAction() {
        this.handleConfirm();
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this.button.addEventListener('click', this._executeConfirmedAction);
    }
}