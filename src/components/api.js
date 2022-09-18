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
            .then(res => {
                if (res.ok) {
                   return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
                
            })
    }

    getCardsFromServer() {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
            headers: {
                'authorization': this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            })
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    likeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                'authorization': this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
    }

    dislikeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                'authorization': this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
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
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
    }
}