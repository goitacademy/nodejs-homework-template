const getAllContacts = require("./getAllContacts")
const getContactById = require("./getContactById")
const addContact = require("./addContact")
const updatePutContact = require("./updatePutContact")
const updatePatchContact = require("./updatePatchContact")
const updatePatchContactFavorite = require("./updatePatchContactFavorite")
const removeContact = require("./removeContact")
const removeAllContacts = require("./removeAllContacts")


module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    updatePutContact,
    updatePatchContact,
    updatePatchContactFavorite,
    removeContact,
    removeAllContacts
}