import { Popup } from "./popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, confirmedAction) {
        super(popupSelector);
        this.confirmedAction = confirmedAction;
        this._executeConfirmedAction = this.executeConfirmedAction.bind(this);
    }

    setNewConfirmedAction(action) {
        this.confirmedAction = action;
    }

    executeConfirmedAction() {
        this.confirmedAction();
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this.button.addEventListener('click', this._executeConfirmedAction);
    }
}