const getAllContactsController = require('./getAllContactsControllers')
const getContactByIdController = require('./getContactByIdController')
const postContactController = require('./postContactController')
const deleteContactController = require('./deletContactController')
const updateContactByIdController = require('./updateContactByIdController')
const updateFavoriteController = require('./updateFavoriteController')

module.exports = {
    getAllContactsController,
    getContactByIdController,
    postContactController,
    deleteContactController,
    updateContactByIdController,
    updateFavoriteController,
}