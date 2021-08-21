const listContacts = require("./listContacts");
const updateContactsList = require("./updateContactsList");


const updateContact = async (contactId, body) => {
    try {
        const contacts = await listContacts();
        const idx = contacts.findIndex(item => String(item.id) === String(contactId));
        if (idx === -1) {
            return null;
        }
        products[idx] = { ...contacts[idx], ...body };

        await updateContactsList(contacts);
        return contacts[idx];
    }
    catch (error) {
        throw error;
    }
};

module.exports = updateContact;