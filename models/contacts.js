const fs = require('fs/promises')
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./models/contacts.json')


const listContacts = async () => {
  try {
    const dataString = await fs.readFile(contactsPath, 'utf8');
    const data = JSON.parse(dataString);
    return data;
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const [contact] = contacts.filter(contact => contact.id === String(contactId));
    return contact
  } catch (error) {
    console.log(error)
  }

}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === String(contactId));
    if (idx !== -1) {
      contacts.splice(idx, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
    }

    return;
  } catch (error) {
    console.log(error)
  }
}

const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  try {
    const contacts = await listContacts();
    const newListContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newListContacts));
    return newContact
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, { name, email, phone }) => {

  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === String(contactId));
    if (idx !== -1) {
      contacts[idx].name = name;
      contacts[idx].email = email;
      contacts[idx].phone = phone;
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
    }
    return contacts[idx];
  } catch (error) {
    console.log(error)
  }

}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
