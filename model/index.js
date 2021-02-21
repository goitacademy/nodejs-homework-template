const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const information = await fs.readFile(contactsPath, 'utf-8');
    const parsedContacts = JSON.parse(information);
    return parsedContacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const information = await fs.readFile(contactsPath, 'utf-8');
    const parsedContacts = JSON.parse(information);
    const showContactById = parsedContacts.find(
      (contact) => String(contact.id) === String(contactId)
    );
    return showContactById;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const information = await fs.readFile(contactsPath, 'utf-8');
    const parsedContacts = JSON.parse(information);
    const listWithoutDeletedContact = parsedContacts.filter(
      ({ id }) => id !== contactId
    );
    const stringifiedContacts = JSON.stringify(
      listWithoutDeletedContact,
      null,
      2
    );
    fs.writeFile(contactsPath, stringifiedContacts, 'utf-8');
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const newContact = {
      id: uuidv4(),
      ...body,
    };
    const information = await fs.readFile(contactsPath, 'utf-8');
    const parsedContacts = JSON.parse(information);
    const listWithAddedContact = [newContact, ...parsedContacts];
    const stringifiedContacts = JSON.stringify(listWithAddedContact, null, 2);
    fs.writeFile(contactsPath, stringifiedContacts, 'utf-8');
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const information = await fs.readFile(contactsPath, 'utf-8');
    const parsedContacts = JSON.parse(information);
    // eslint-disable-next-line array-callback-return
    const updatedContact = await parsedContacts.find((contact) => {
      if (String(contact.id) === String(contactId)) {
        contact.name = body.name ?? contact.name;
        contact.email = body.email ?? contact.email;
        contact.phone = body.phone ?? contact.phone;
        return contact;
      }
    });
    const listWithUpdatedContact = [...parsedContacts];
    const stringifiedContacts = JSON.stringify(listWithUpdatedContact, null, 2);
    fs.writeFile(contactsPath, stringifiedContacts, 'utf-8');
    return contactId ? updatedContact : null;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
