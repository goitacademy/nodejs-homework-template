const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid').v4;

const contactsPath = path.join('models', 'contacts.json');

//get list of all contacts
const listContacts = async () => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  return contacts;
};

//get contact by id
const getContactById = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  const contact = contacts.find((item) => item.id === contactId);
  return contact;
};

//create new contact
const addContact = async (body) => {
  const dataFromDB = await fs.readFile(contactsPath);
  const contacts = JSON.parse(dataFromDB);
  const newContact = {
    id: uuid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

//delete contact
const removeContact = async (contactId) => {
    const dataFromDB = await fs.readFile(contactsPath);
    const contacts = JSON.parse(dataFromDB);
    const updatedContactsList = contacts.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContactsList));
    return updatedContactsList;
};


//Edit contact's data
const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const dataFromDB = await fs.readFile(contactsPath);
  const contacts = JSON.parse(dataFromDB);
  const contact = contacts.find((item) => item.id === contactId);

  if (name) contact.name = name;
  if (email) contact.email = email;
  if (phone) contact.phone = phone;

  const contactIdx = contacts.findIndex((item) => item.id === contactId);
  contacts[contactIdx] = contact;

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
