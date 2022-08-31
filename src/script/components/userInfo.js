export class UserInfo {
    constructor(userNameSelector, userDescriptionSelector) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    };

    getUserInfo() {
        let userInfo = {
            userName: this._userNameElement.textContent,
            userDescription: this._userDescriptionElement.textContent
        };

        return userInfo;
    };

    setUserInfo([userNameInput, userDescriptionInput]) {
        this._userNameElement.textContent = userNameInput.value;
        this._userDescriptionElement.textContent = userDescriptionInput.value;
    }
}