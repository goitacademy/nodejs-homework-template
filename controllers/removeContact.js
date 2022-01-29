const fs = require("fs/promises");

const getContacts = require("./getContacts.js");

const removeContact = async (pathToDB, contactId) => {
    const id = contactId.toString();
    const contactList = await getContacts(pathToDB);

    const removedContact = contactList.find(contact => contact.id === id);
    if(!removedContact) {
        return null
    }
    const filtredList = contactList.filter(contact => contact.id !== removedContact.id);
    await fs.writeFile(pathToDB, JSON.stringify(filtredList));
    return removedContact;
}

module.exports = removeContact;
