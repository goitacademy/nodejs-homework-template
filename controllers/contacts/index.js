const { ctrlWrapper } = require("../../helpers");

const getAllContacts = require("./getAllContacts");

const getContactById = require("./getContactById");

const addContact = require("./addContact");

const removeContact = require("./removeContact");

const updateContact = require("./updateContact");

const updateFavorite = require("./updateFavorite")




module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite),
}