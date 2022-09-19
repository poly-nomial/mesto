export class UserInfo {
    constructor(userNameSelector, userDescriptionSelector, userAvatarSelector) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userDescriptionElement = document.querySelector(userDescriptionSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector);
    };

    getUserInfo() {
        const userInfo = {
            name: this._userNameElement.textContent,
            about: this._userDescriptionElement.textContent,
            avatar: this._userAvatarElement.style['background-image']
        };

        return userInfo;
    };

    setUserInfo([userName, userDescription, userAvatarLink, userId]) {
        this._userNameElement.textContent = userName;
        this._userDescriptionElement.textContent = userDescription;
        this._userAvatarElement.style[`background-image`] = `url(${userAvatarLink})`;
        this.userId = userId;
    };
}