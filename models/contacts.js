const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join(__dirname, "./contacts.json")

const listContacts = async () => {
  const contactsData = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsData);
  return contacts;
}

const getContactById = async (contactId) => {
   const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  if (!contact) {
    return null;
    }
    return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  const id = uuidv4();
  const contact = { id, name, email, phone };  
  contacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return contact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
   contacts[index] = { ...contacts[index], ...body }
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[index]

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
