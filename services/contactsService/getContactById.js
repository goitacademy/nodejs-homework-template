const { Contact } = require("../../models/contacts");

async function getContactById(contactId) {
    return await Contact.findById(contactId);
}

module.exports = {getContactById}