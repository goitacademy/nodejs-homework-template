const updateContact = require('./updateContact')

const listContacts = require('./listContacts');

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => (contact.id).toString() === contactId);
    if (idx === -1) {
      return null;
    }
    contacts.splice(idx, 1);
    await updateContact(contacts);
    return contacts[idx];
  } catch (error) {
    throw (error.message)
  }
};

// console.log(typeof (removeContact));
module.export = removeContact;
