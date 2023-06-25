const fs = require('node:fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');


const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath, "utf-8"))
};

const getContactById = async (id) => {
  console.log(id);
  const contacts =  await listContacts();
  const findContact = contacts.find((contact) => contact.id === id);
  if (findContact) {
      return findContact;
  } 
  return null;

}

const removeContact = async (contactId) => {}

const addContact = async (body) => {
  const {name, email, phone} = body;
  const contacts = await JSON.parse(await fs.readFile(contactsPath));
  const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;

}

const updateContact = async (contactId, body) => {

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
