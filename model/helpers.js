const fs = require('fs/promises');

const readData = async (filePath) => {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

const searchContactById = async (contacts, contactId) =>
  await contacts.find(({ id }) => id.toString() === contactId.toString());

const isNameInContacts = async (contacts, newName) => await contacts.some(({ name }) => name === newName);

const isPhoneInContacts = async (contacts, newPhone) => await contacts.some(({ phone }) => phone === newPhone);

const isEmailInContacts = async (contacts, newEmail) => await contacts.some(({ email }) => email === newEmail);

const editContact = (contact, newData) => {
  Object.keys(newData).forEach((key) => {
    if (newData[key]) contact[key] = newData[key];
  });

  return contact;
};

module.exports = {
  readData,
  writeData,
  searchContactById,
  isNameInContacts,
  isPhoneInContacts,
  isEmailInContacts,
  editContact,
};
