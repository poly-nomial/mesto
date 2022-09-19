export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._token = options.headers.authorization;
        this._cohort = "cohort-50";
    }

    getUserInfo() {
       return fetch(`${this._baseUrl}/${this._cohort}/users/me`, {
            headers: {
                'authorization': this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._getResponseData(res));
    }

    getCardsFromServer() {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
            headers: {
                'authorization': this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._getResponseData(res));
    }

    editUserInfo([newUserName, newUserDescription]) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me`, {
            method: 'PATCH',
            headers: {
                'authorization': this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newUserName,
                about: newUserDescription
            })
        })
            .then(res => this._getResponseData(res));
        }

    postNewCard(newCard) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
            method: 'POST',
            headers: {
                'authorization': this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link
            })
        })
            .then(res => this._getResponseData(res));
    }

    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'authorization': this._token,
                'Content-Type': 'application/json'
            },
        })
            .then(res => this._getResponseData(res));
    }

    likeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                'authorization': this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._getResponseData(res));
    }

    dislikeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                'authorization': this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._getResponseData(res));
    }

    updateAvatar(newAvatarLink) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'authorization': this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: newAvatarLink
            })
        })
            .then(res => this._getResponseData(res));
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        } else {
            return res.json()
        }
    }
}