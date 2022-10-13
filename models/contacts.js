const path = require("path");
const fs = require("fs/promises");

const nanoid = require('nanoid')

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === String(contactId));
  return result || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id ===String(contactId) 
  );
  if (index === -1) {
    return null;
  }
  const removedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}

const addContact = async ({body}) => {
 const contacts = await listContacts();
  const newContact = {
    id: nanoid.nanoid(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const contact = contacts.find(contact => contact.id === contactId)
  if(!contact){
    return null
  }
  const updatedContact = {
    ...contact,
    phone: body?.phone || contact.phone,
    name: body?.name || contact.name,
    email: body?.email || contact.email
  }
  const updatedList = contacts.map(contact => {
    if(contact.id === contactId){
      return updatedContact
    }
    return contact
  })
  await fs.writeFile(contactsPath, JSON.stringify(updatedList, null, 2));
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}