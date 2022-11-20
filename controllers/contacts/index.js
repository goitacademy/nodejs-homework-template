const getAllContacts = require("./getAllContacts")
const getContactById = require("./getContactById")
const addContact = require("./addContact")
const updatePutContact = require("./updatePutContact")
const updatePatchContact = require("./updatePatchContact")



module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    updatePutContact,
    updatePatchContact
}