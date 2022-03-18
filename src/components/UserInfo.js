export class UserInfo {
    constructor({ profileNameSelector, profileJobSelector, profileImageSelector }) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileJob = document.querySelector(profileJobSelector);
        this._profileImage = document.querySelector(profileImageSelector);

    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            job: this._profileJob.textContent, 
            avatarlink: this._profileImage.src
        }
    }

    setUserInfo({ name, job, avatarlink}) {
        this._profileName.textContent = name;
        this._profileJob.textContent = job;
        this._profileImage.src = avatarlink;
    }
}