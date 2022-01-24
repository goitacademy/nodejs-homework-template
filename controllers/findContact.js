const getContacts = require("./getContacts.js");

const getContactById = async (pathToDB, contactId) => {
    const id = contactId.toString();
    const contactList = await getContacts(pathToDB);
    return contactList.find((contact) => {
        return id === contact.id ? contact: null;
    });
}

module.exports = getContactById;
