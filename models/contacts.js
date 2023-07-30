const fs = require('fs/promises')
const path = require('path');

const filePath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find(contact => contact.id === contactId);
  return contact || null;

}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === contactId)
  if (index === -1) return null;

  const [result] = allContacts.splice(index,1);
  await fs.writeFile(filePath, JSON.stringify(allContacts, null, 2))
  console.log(result);
  return result.id;
}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
