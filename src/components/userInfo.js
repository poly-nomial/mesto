export class UserInfo {
    constructor(userNameSelector, userDescriptionSelector) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    };

    getUserInfo() {
        const userInfo = {
            userName: this._userNameElement.textContent,
            userDescription: this._userDescriptionElement.textContent
        };

        return userInfo;
    };

    setUserInfo([userName, userDescription]) {
        this._userNameElement.textContent = userName;
        this._userDescriptionElement.textContent = userDescription;
    }
}