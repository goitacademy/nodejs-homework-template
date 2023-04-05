const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

// const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://MaryDan:4W3dbq1I6FNwX1DA@cluster0.0qilsj8.mongodb.net/phonebook?retryWrites=true&w=majority";

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     app.listen(3000, () => {
//       console.log("Database connection successful");
//     });
//   })
//   .catch((error) => console.log(error.message));

// const app = require("./app");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(DB_HOST, { encoding: "utf-8" });
  // const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index < 0) {
    return null;
  }

  const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updatedContact;
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
