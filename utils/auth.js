const Token = 'USER_TOKEN';
const UserInfo = 'USER_INFO';
const UserSavePassword = 'UER_SAVE_PASSWORD'; //预留
const UserOldManList = 'USER_OLD_MAN_LIST';
const UserOldManForm = 'USER_OLD_MAN_FORM';

export function setToken(token) {
  uni.setStorageSync(Token, token);
}

export function getToken() {
  // TODO:token 先写死,待改
  return uni.getStorageSync(Token)
  // return uni.getStorageSync(Token)||'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjExMSIsImlhdCI6MTYxMzcwNDkyOX0.aX7IZK5liUphx7oPIRkuv51M8LRZTEu36qM0rESZCZ0';
}


export function setUserInfo(userInfo) {
  uni.setStorageSync(UserInfo, userInfo);
}

export function getUserInfo() {
  return uni.getStorageSync(UserInfo);
}


export function setSavePassword(saveInfo) {
  uni.setStorageSync(UserSavePassword, saveInfo);
}

export function getSavePassword() {
  return uni.getStorageSync(UserSavePassword);
}

export function setOldManList(oldManList) {
  uni.setStorageSync(UserOldManList, oldManList);
}

export function getOldManList() {
  return uni.getStorageSync(UserOldManList);
}

export function setOldManForm(oldManForm) {
  uni.setStorageSync(UserOldManForm, oldManForm);
}

export function getOldManForm() {
  return uni.getStorageSync(UserOldManForm);
}


export default {
  setToken,
  getToken,
  setUserInfo,
  getUserInfo,
  setSavePassword,
  getSavePassword,
  setOldManList,
  getOldManList,
  setOldManForm,
  getOldManForm,
}
