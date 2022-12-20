const {
    getAllContactsController,
    getContactController,
    postContactController,
    deleteContactController,
    putContactController,
    updateContactFavouriteController,
    } = require('./contactsController')
    
const {
    registerController,
    loginController,
    currentUserController,
    logoutUserController,
    updateUserSubscriptionController,
} = require('./authController');

module.exports = {
    getAllContactsController,
    getContactController,
    postContactController,
    deleteContactController,
    putContactController,
    updateContactFavouriteController,
    registerController,
    loginController,
    currentUserController,
    logoutUserController,
    updateUserSubscriptionController,
}