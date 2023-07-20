const {  login } = require('./auth/loginController');
const {  logout } = require('./auth/logoutControler');
const { signup } = require('./auth/signupController');
const { getCurrent, changeUserSubscription } = require('./users/usersControllers');
const { listContacts} = require('./notices/listNotices');
const { getContactById } = require('./notices/getNotice');
const { removeContact } = require('./notices/removeNotice');
const {  addContact} = require('./notices/addNotice');
const { updateStatusContact } = require('./notices/updateStatusNotice');
const { updateContact } = require('./notices/updateContact');
const {changeAvatarImg} = require('./users/changeAvatarImg')


module.exports = {
    signup, login, logout,
    getCurrent, changeUserSubscription,
    listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact, changeAvatarImg
}
