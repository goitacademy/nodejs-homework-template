const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./models/contacts.json');

const listContacts = async () => {
   try {
    const allContacts = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(allContacts);
  } catch (error) {
    console.log(error);
  }
}

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const contact = allContacts.find(contact => contact.id === contactId);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(contact => contact.id === contactId);
    const deletedContact = allContacts[index];
    if (index !== -1) {
      allContacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, '\t'));
    }
    return deletedContact;
  } catch (error) {
    console.log(error);
  }
}

const addContact = async ({ name, email, phone }) => {
try {
    const newContact = {
    id: uuidv4(),
    name,
    email,
    phone
  };
  const allContacts = await listContacts();
  const contactsList = JSON.stringify([ ...allContacts, newContact], null, '\t');
  await fs.writeFile(contactsPath, contactsList);
  return newContact;
  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (contactId, {name, email, phone}) => {
try {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === contactId);
  if (index !== -1) {
    allContacts[index].name = name;
    allContacts[index].email = email;
    allContacts[index].phone = phone;

    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, '\t'));
    return allContacts[index];
  } else {
    return null;
  }
} catch (error) {
  console.log(error);
}
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
