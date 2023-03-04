const fs = require("fs/promises");
const { randomUUID } = require("crypto");

const getAllContacts = require("./getAllContacts");
const contactsPath = require("./contactsPath");

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await getAllContacts();
    const newContact = {
      id: randomUUID(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (err) {
    return console.log(err.message);
  }
};

module.exports = addContact;
