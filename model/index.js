const fs = require('fs/promises');
const contacts = require('./contacts.json');
const { customAlphabet } = require('nanoid/non-secure');
const path = require('path');
// const { nanoid } = require('nanoid');
const nanoid = customAlphabet('1234567890', 4);
const colors = require('colors');
const { nextTick } = require('process');
const contactsPath = path.join(__dirname, './contacts.json');

const parsedContact = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data.toString());
  } catch (error) {
    return console.log(error.message);
  }
};

const listContacts = async () => {
  try {
    const contacts = await parsedContact();
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await parsedContact();
    const contactFilterId = contacts.find(
      contact => Number(contact.id) === Number(contactId),
    );

    if (!contactFilterId)
      return console.error(`Пользователя с id ${contactId} не найден`.red);

    console.log(contactFilterId);
    return contactFilterId;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await parsedContact();
    const id = Number(contactId);

    const delContactId = contacts.filter(contact => Number(contact.id) !== id);
    if (contacts.length === delContactId.length) {
      return console.log(`Пользователя с id ${contactId} не найден`.red);
    }

    fs.writeFile(contactsPath, JSON.stringify(delContactId, null, 2), err => {
      if (err) {
        console.log(err);
        return;
      }
    });
    console.log(`Контакт с id ${contactId} удален!`.green);
    return delContactId;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async body => {
  try {
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
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await parsedContact();

  const idContact = contacts.map(contact =>
    contact.id === Number(contactId) ? { ...contact, ...body } : contact,
  );

  const updateContact = idContact.find(({ id }) => id === Number(contactId));

  if (updateContact) {
    await fs.writeFile(contactsPath, JSON.stringify(idContact, null, 2));
    return updateContact;
  }
  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
