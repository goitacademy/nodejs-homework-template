const { ctrlWrapper } = require("../../decorators");

const addContact = require("./addContact");
const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const removeContactById = require("./removeContactById");
const updateContactById = require("./updateContactById");
const updateFavorite = require("./updateFavorite");

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContactById: ctrlWrapper(removeContactById),
    updateContactById: ctrlWrapper(updateContactById),
    updateFavorite: ctrlWrapper(updateFavorite),
}
