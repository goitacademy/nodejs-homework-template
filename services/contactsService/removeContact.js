const { Contact } = require("../../models/contacts");

async function removeContact(contactId) {
    const contact = await Contact.findById(contactId);

    if (!contact) {
        return "Not found";
    }
    await Contact.findByIdAndRemove(contactId);
}

module.exports = {removeContact}