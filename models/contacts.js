import { nanoid } from "nanoid";
const fs = require("fs");
const path = require("path");

const contactsPath = path.resolve("./contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(
    contactsPath,
    "utf8",
    function (error, data) {
      if (error) {
        console.log(error);
      }
    }
  );
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => Number(contact.id) === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filterContacts = await contacts.filter(
    (contact) => Number(contact.id) === contactId
  );
  const removedContact = await fs.writeFile(
    contactsPath,
    JSON.stringify(filterContacts),
    function (error) {
      if (error) {
        return console.log(error);
      }
    }
  );

  return removedContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  contacts.push({
    id: nanoid(),
    name,
    email,
    phone,
  });
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
