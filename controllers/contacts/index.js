const getContactsController = require("./getContactsController");
const putChangeContactController = require("./putChangeContactController");
const patchFavoriteContactController = require("./patchFavoriteContactController");
const getContactByIdController = require("./getContactByIdController");
const postAddContactController = require("./postAddContactController");
const deleteContactController = require("./deleteContactController");

module.exports = {
    getContactsController,
    putChangeContactController,
    patchFavoriteContactController,
    getContactByIdController,
    postAddContactController,
    deleteContactController,
}