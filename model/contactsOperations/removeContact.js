const listContacts = require('./listContacts');
const updateContacts = require('./updateContacts');

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => String(contact.id) === String(contactId));
    if(index === -1) {
        return null
    }
    const removedContact = contacts.splice(index, 1);
    await updateContacts(removedContact);
    return removedContact;
}   

module.exports = removeContact;