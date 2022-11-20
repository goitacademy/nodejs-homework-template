const getAllContacts = require("./getAllContacts")
const getContactById = require("./getContactById")
const addContact = require("./addContact")
const updatePutContact = require("./updatePutContact")
const updatePatchContact = require("./updatePatchContact")
const removeContact = require("./removeContact")


module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    updatePutContact,
    updatePatchContact,
    removeContact
}