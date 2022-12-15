const {
    getAllContactsController,
    getContactController,
    postContactController,
    deleteContactController,
    putContactController,
    updateContactFavoriteController } = require('./contactsController')
    
const {registerController } = require('./authController');

module.exports = {
    getAllContactsController,
    getContactController,
    postContactController,
    deleteContactController,
    putContactController,
    updateContactFavoriteController,
    registerController,
}