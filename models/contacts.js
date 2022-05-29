const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');
const { v4 } = require('uuid');

const listContacts = async () => {
  const dataStr = await fs.readFile(contactsPath, 'utf-8');
  const dataParse = JSON.parse(dataStr);
  return dataParse;
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts()
  const productById = allContacts.find(product => product.id === contactId);
  return productById || null;
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === contactId);
  const removeContact = allContacts[index];
  if (index !== -1) {
    allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts))
  }

  return removeContact || null;
}

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();

  if (
    allContacts.find(contact => contact.name.toLowerCase() === name.toLowerCase()) ||
    allContacts.find(contact => contact.phone === phone)
  ) {
    return null;
  }

  const newContact = {
    id: v4(),
    name: name,
    email: email,
    phone: phone,
  }

  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}

const updateContact = async (contactId, name, email, phone) => {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(contact => contact.id === contactId);

  if (contactIndex !== -1) {
    allContacts[contactIndex].name = name;
    allContacts[contactIndex].phone = phone;
    allContacts[contactIndex].email = email;

    await fs.writeFile(contactsPath, JSON.stringify(allContacts))
    return allContacts[contactIndex];
  } else {
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
