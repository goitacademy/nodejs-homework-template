const fs = require('fs/promises');
const contacts = require('./contacts.json');
const { customAlphabet } = require('nanoid/non-secure');
const path = require('path');
// const { nanoid } = require('nanoid');
const nanoid = customAlphabet('1234567890', 4);
const colors = require('colors');
const contactsPath = path.join(__dirname, './contacts.json');

async function parsedContact() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data.toString());
  } catch (error) {
    return console.log(error.message);
  }
}

const listContacts = async () => {
  try {
    const contacts = await parsedContact();
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async contactId => {};

const removeContact = async contactId => {};

const addContact = async body => {
  const contacts = await parsedContact();
  const id = nanoid();
  const { name, email, phone } = body;

  const replaceContact = contacts
    .map(contact => contact.name)
    .find(id => id === name);
  const replaceEmail = contacts
    .map(contact => contact.email)
    .find(id => id === email);

  if (replaceContact || replaceEmail) {
    return console.error(
      `Пользователь с таким именем или email уже создан!`.red,
    );
  }
  const addContact = {
    id: Number(id),
    name,
    email,
    phone,
  };
  console.log(`Пользователь ${name} создан!`.bgBrightWhite.green);

  const newContact = [...contacts, addContact];

  fs.writeFile(contactsPath, JSON.stringify(newContact, null, 2), err => {
    if (err) {
      console.log(err);
      return;
    }
  });
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
