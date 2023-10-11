const { table } = require("console");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const colors = require("colors");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    return "error";
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const findContact = contacts.find((contact) => contact.id === contactId);
    if (findContact === undefined) {
      return console.log(`There is no contact with ID = ${contactId}`.red);
    } else {
      return findContact;
    }
  } catch (err) {
    return "error";
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    contacts.map((contact) => {
      if (contact.id === contactId) {
        console.log("The removed contact".green, contact),
          "_____________________",
          contacts.splice(contacts.indexOf(contact), 1);
      }
    });

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (err) {
    console.error("error");
  }
};

const saveContact = (data) => {
  contactList.push({ id: nanoid(), ...data.contact });
  console.log(contactList);
};

const addContact = async (object) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const newContact = {
      id: nanoid(),
      name: object.contact.name,
      email: object.contact.email,
      phone: object.contact.phone,
    };
    const findContact = contacts.find(
      (contact) =>
        contact.name === object.contact.name ||
        contact.email === object.contact.email ||
        contact.phone === object.contact.phone
    );

    if (findContact === undefined) {
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    } else {
      console.log(`There is alredy contact with the same data `);
    }
  } catch (error) {
    console.error("error");
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const findContact = contacts.find((contact) => contact.id === contactId);
    if (findContact === undefined) {
      return `There is no contact with ID= ${contactId}`;
    } else {
      Object.assign(findContact, body);
      console.table(contacts);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    }
  } catch (err) {
    return "error";
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  saveContact,
};
