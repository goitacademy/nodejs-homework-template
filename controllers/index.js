const {  login } = require('./auth/loginController');
const {  logout } = require('./auth/logoutControler');
const { signup } = require('./auth/signupController');
const { getCurrent, changeUserData } = require('./users/usersControllers');
const { listNotices} = require('./notices/listNotices');
const { getNoticeById } = require('./notices/getNotice');
const { removeNotice } = require('./notices/removeNotice');
const { addNotice } = require('./notices/addNotice');
const { getAllNotices } = require('./notices/getAllNotices');
const { filterNotices } = require('./notices/filterNotices');
const { updateStatusContact } = require('./notices/updateStatusNotice');
const { changeAvatarImg } = require('./users/changeAvatarImg');
const { addFavorites, removeFavorites, getFavorites} = require('./users/updateFavorites')
const { listPets, addPet, removePet } = require('./pets/petsControllers')



module.exports = {
    signup, login, logout,
    getCurrent, changeUserData,
    listNotices, getNoticeById, removeNotice, addNotice, updateStatusContact, changeAvatarImg, getAllNotices,
    listPets, addPet, removePet, filterNotices, addFavorites, removeFavorites, getFavorites
}
