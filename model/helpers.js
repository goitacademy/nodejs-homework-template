const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './contacts.json');

const readData = async (filePath = contactsPath) => {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = async (data, filePath = contactsPath) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

const isPhoneInContacts = async (contacts, newPhone) =>
  await contacts.some(({phone}) => phone === newPhone);

const isEmailInContacts = async (contacts, newEmail) =>
  await contacts.some(({email}) => email === newEmail);

const editContact = (contact, newData) => {
  Object.keys(newData).forEach((key) => {
    if (newData[key]) contact[key] = newData[key];
  });

  return contact;
};

module.exports = {
  readData,
  writeData,
  isPhoneInContacts,
  isEmailInContacts,
  editContact,
};
