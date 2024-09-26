const emailRegExp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/;

const phoneRegExp = /^\(\d\d\d\) \d\d\d-\d\d\d\d$/;

module.exports = {
  emailRegExp,
  passwordRegExp,
  phoneRegExp,
};
