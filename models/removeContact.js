const { overwritingContacts } = require("../helpers");
const listContacts = require("./listContacts");

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const removeContactIndex = contacts.findIndex(contact => contact.id === contactId);

    if (removeContactIndex === -1) {
        return null;
    }

    const [result] = contacts.splice(removeContactIndex, 1);
    console.log(result);
    await overwritingContacts(contacts);
    return result;
};

module.exports = removeContact;