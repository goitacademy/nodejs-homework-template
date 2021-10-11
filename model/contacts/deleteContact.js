const updateContacts = require("./updateContacts");
const getAllContacts = require("./getAllContacts")

const deleteContact = async (contactId) => {
    try {
        const contacts = await getAllContacts();
        const idx = contacts.findIndex(item => item.id == contactId);
        if (idx === -1) {
            return null;
        }
        const newContacts = contacts.filter(item => item.id !== contactId);
        await updateContacts(newContacts);
        return contacts[idx];
    }
    catch (error) {
        throw error;
    }
};

module.exports = deleteContact;