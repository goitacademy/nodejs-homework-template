const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join('models', 'contacts.json');

const listContacts = async() => {
    const contacts = await fs.readFile(contactsPath, { encoding: 'utf-8' });
    return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find(({ id }) => id === contactId) ?? null;
}

const removeContact = async(contactId) =>{
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);

    if (index < 0) {
      return null;
    }

    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return { message: "contact deleted" };
}

const addContact = async body => {
    const contacts = await listContacts();
    const contactExists = Boolean(
      contacts.find((contact) => contact.name === body.name)
    );
    if (contactExists) return null;
  
    const newContact = { id: nanoid(), ...body };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact;
}


const updateContact = async(contactId, body) => {
    const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index < 0) {
    return null;
  }

  contacts[index] = {...contacts[index], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

  return contacts[index];
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}