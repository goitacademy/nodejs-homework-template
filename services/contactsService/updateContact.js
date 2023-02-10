const { Contact } = require("../../models/contacts");

async function updateContact(contactId, userData) {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, userData, {
        new: true,
    });
    return updatedContact;
}

module.exports = {updateContact}