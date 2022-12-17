const {
    getAllContactsController,
    getContactController,
    postContactController,
    deleteContactController,
    putContactController,
    updateContactFavoriteController,
    } = require('./contactsController')
    
const {
    registerController,
    loginController,
    currentUserController,
    logoutUserController,
} = require('./authController');

module.exports = {
    getAllContactsController,
    getContactController,
    postContactController,
    deleteContactController,
    putContactController,
    updateContactFavoriteController,
    registerController,
    loginController,
    currentUserController,
    logoutUserController,
}