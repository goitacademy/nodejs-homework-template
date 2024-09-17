const PASSWORD_REGEXP = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^ws]).{8,16}$";
const PHONE_REGEXP = "^([+])?([- ()]?[0-9][- ()]?){10,14}$";

module.exports = {
  PASSWORD_REGEXP,
  PHONE_REGEXP,
};