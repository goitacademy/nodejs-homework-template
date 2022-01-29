const fs = require("fs/promises");

const getContacts = require("./getContacts.js");

const updateContact = async (pathToDB, contactId, updatedContact) => {
    if(!contactId) {
        return null
    }
    const contactList = await getContacts(pathToDB);
    let searchedContact = contactList.find(contact => contact.id === contactId);
    const updatedContactList = contactList.filter(contact => contact.id !== searchedContact.id)
    searchedContact = {...searchedContact, ...updatedContact}
    updatedContactList.push(searchedContact);
    updatedContactList.sort((a, b) => a.id - b.id);
    await fs.writeFile(pathToDB, JSON.stringify(updatedContactList))

    return  searchedContact;
}

module.exports = updateContact;
