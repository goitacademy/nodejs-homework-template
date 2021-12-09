
const getAll = require('./getAll.js')
const getById = require("./getContactById")
const addContacts = require('./addContact')
const deleteContact = require("./delete")
const updateContact = require("./update")

module.exports = {
    getAll,
    getById,
    addContacts,
    deleteContact,
    updateContact
}