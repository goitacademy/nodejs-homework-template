// const contactControllers = require("./contactControllers")
const getContacts = require("./getContacts");
const getContactById = require("./getContactById");
const deleteContact = require("./deleteContact");
const createContact = require("./createContact");
const updateContact = require("./updateContact");
const updateContactByStatus = require("./updateContactByStatus")

module.exports = {
    getContacts,
    getContactById,
    deleteContact,
    createContact,
    updateContact,
    updateContactByStatus,
}
