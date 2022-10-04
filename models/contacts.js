const fs = require('fs/promises')
const path = require('path');

const contactsPath = path.join(__dirname, '/contacts.json');

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(contact => contact.id === contactId);
  return contactById;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return
  }

  const deletedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return deletedContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const newContactList = contacts.map(contact =>
    contact.id === contactId ? { ...body, id: contactId } : contact);
  console.log(contactId)
  console.log(newContactList)
  await fs.writeFile(contactsPath, JSON.stringify(newContactList));

  const result = getContactById(contactId);
  return result;
}

module.exports = {
  getContactById,
  removeContact,
  updateContact,
}
