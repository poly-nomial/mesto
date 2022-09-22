import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._photoElement = this._popup.querySelector('.popup__photo');
        this._titleElement = this._popup.querySelector('.popup__photo-title');
    }

    open(photoName, photoLink) {
        this._photoElement.setAttribute('src', photoLink);
        this._photoElement.setAttribute('alt', photoName);
        this._titleElement.textContent = photoName;
        super.open();
    }
}