const fs = require('node:fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const contactsPath = path.join(__dirname, 'contacts.json');


const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath, "utf-8"))
};

const updateListContacts = async (contacts) => {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const getContactById = async (contactId) => {
  const contacts =  await listContacts();
  const findContact = contacts.find((contact) => contact.id === contactId);
  if (findContact === -1) return null;

  return findContact;


}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const getContact = contacts.findIndex(contact => contact.id === contactId);
  
  if (getContact === -1) return null;

  const removeContact = contacts[getContact];
  contacts.splice(getContact, 1);
  await updateListContacts(contacts);
  return removeContact;
}




const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  const newContact = {
      id: randomUUID(),
      name,
      email,
      phone,
    };
  contacts.push(newContact);
  await updateListContacts(contacts);
  return newContact;

}

const updateContact = async (contactId, {name, email, phone}) => {
  const contacts = await listContacts();
  const findContact = contacts.findIndex(contact => contact.id === contactId);
  if (findContact === -1) return null;

    const newContact = {
      id: randomUUID(),
      name,
      email,
      phone,
    };
    contacts.splice(findContact, 1, newContact);
    await updateListContacts(contacts);
    return newContact;

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
