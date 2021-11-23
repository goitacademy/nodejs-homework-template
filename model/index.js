const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises')
const contactsPath = require('./contactsPath')

const listContacts = async () => {
  try {
    const contactsData = await fs.readFile(contactsPath, 'utf-8')
    return JSON.parse(contactsData);
  } catch (error) {
    console.error(error);
  };
};

const getContactById = async (contactId) => {
  try {
    const contactsData = await listContacts();
    return contactsData.find(contact => contact.id === Number(contactId))
  } catch (error) {
    console.error(error)
  };
};

const removeContact = async (contactId) => {
  try {
    const contactsData = await listContacts();
    const newContactsList = contactsData.filter(contact => contact.id === Number(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, 2))
    return newContactsList
  } catch (error) {
    console.error(error)
  };
};

const addContact = async (name, email, phone) => {
  const newContact = {id:uuidv4(), name, email, phone}
  try {
    const findContact = await fs.readFile(contactsPath, 'utf-8')
    const parseContacts = JSON.parse(findContact)
    const newContactsList = [...parseContacts, newContact]
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, 2), 'utf-8')

    return newContactsList

  } catch (error) {
    console.error(error)
  }
}

const updateContactById = async (contactId, body) => {
  const contactsData = await listContacts();
  try {
    const idx = contactsData.findIndex((item) => item.id === Number(contactId));
    if (idx === -1) {
      return null;
    }
    const updateContact = { ...contactsData[idx], ...body };
    contactsData[idx] = updateContact;
    return await updateContact(contactsData);
    
  } catch (error) {
    console.error(error)
  }
}

const updateContact = async (newContact) => {
  await fs.writeFile(contactsPath, JSON.stringify(newContact))
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateContact,
}
