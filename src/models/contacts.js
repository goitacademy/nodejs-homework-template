const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const dbRaw = await fs.readFile(contactsPath, 'utf8');
    const contactsList = JSON.parse(dbRaw);
    return contactsList;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async contactId => {
  try {
    const contactsList = await listContacts();
    const contact = contactsList.find(contact => contact.id === contactId);
    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async contactId => {
  try {
    const contactsList = await listContacts();
    const index = contactsList.findIndex(contact => contact.id === contactId);

    if (index < 0) {
      return null;
    }

    const removedContact = contactsList[index];

    contactsList.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contactsList));
    return removedContact;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async body => {
  try {
    const id = nanoid();
    const contact = { id, ...body };
    const contactsList = await listContacts();

    contactsList.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));

    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsList = await listContacts();

    const changeContactList = contactsList.map(contact => {
      if (contact.id === contactId) {
        const newContact = { ...contact, ...body };
        return newContact
      }
      return contact;
    });

    return changeContactList;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
