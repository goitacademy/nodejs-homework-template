const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')


const listContacts = async (req, res) => {
  const contactsNoParse = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsNoParse);
  return contacts;
}

const getContactById = async (contactId) => {
  const contactsNoParse = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsNoParse);
  const result = contacts.find(contact => contact.id === contactId);
  return result || null;
}

const addContact = async (body) => {
  const contactsNoParse = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsNoParse);
  const allId = contacts.map(contact => parseInt(contact.id));
  const newId = (Math.max(...allId) + 1);
  const strId = newId.toString()
  const newContact = { id: strId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]))
  return newContact || null;
}

const updateContact = async (contactId, body) => {
  const contactsNoParse = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsNoParse);
  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}


const removeContact = async (contactId) => {
  const contactsNoParse = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsNoParse);
  const result = await getContactById(contactId);
  const updatedContacts = contacts.filter(contact => contact.id !== contactId.toString());
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts))
  return result;

}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
