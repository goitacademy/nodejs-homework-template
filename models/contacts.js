const fs = require('fs').promises;
const path = require('path');
const getNanoid = async () => {
  const { nanoid } = await import('nanoid');
  return nanoid;
};

const filename = 'contacts.json';
const filePath = path.join(__dirname, filename);

const listContacts = async () => {
  const response = await fs.readFile(filePath);
  return JSON.parse(response);
};

const getContactById = async contactId => {
  const response = await fs.readFile(filePath);
  const contactsList = JSON.parse(response);
  const contact = contactsList.find(obj => obj.id === contactId);
  return contact;
};
const addContact = async ({ name, email, phone }) => {
  try {
    const contactsList = await listContacts();
    const nanoid = await getNanoid();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    contactsList.push(newContact);
    await fs.writeFile(filePath, JSON.stringify(contactsList, null, 2));

    return newContact;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

const removeContact = async contactId => {
  const rawFile = await fs.readFile(filePath);
  const contactList = JSON.parse(rawFile);
  const indexContact = contactList.findIndex(obj => obj.id === contactId);

  if (indexContact >= 0) {
    contactList.splice(indexContact, 1);
    await fs.writeFile(filePath, JSON.stringify(contactList));
    return true;
  } else {
    return false;
  }
};

const updateContact = async (contactId, updateData) => {
  try {
    const response = await fs.readFile(filePath, 'utf8');
    const contactsList = JSON.parse(response);

    const contactIndex = contactsList.findIndex(
      contact => contact.id === contactId
    );
    if (contactIndex === -1) {
      return null;
    }

    contactsList[contactIndex] = {
      ...contactsList[contactIndex],
      ...updateData,
    };

    await fs.writeFile(filePath, JSON.stringify(contactsList, null, 2));

    return contactsList[contactIndex];
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
