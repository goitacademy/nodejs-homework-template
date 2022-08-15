const { overwritingContacts } = require("../helpers");
const listContacts = require("./listContacts");

const updateContact = async (contactId, { name, email, phone }) => {
    const contacts = await listContacts();
    const updateContactIndex = contacts.findIndex(contact => contact.id === contactId);

    if (updateContactIndex === -1) {
        return null;
    };

    contacts[updateContactIndex] = {
        id: contactId,
        name,
        email,
        phone
    };

    await overwritingContacts(contacts);
    return contacts[updateContactIndex];
};

module.exports = updateContact;