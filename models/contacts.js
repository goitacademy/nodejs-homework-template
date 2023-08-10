const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const dataValidator = require("../helpers/dataValidator");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const parsedData = await JSON.parse(data);
  return parsedData;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contactById = contacts.filter((contact) => contact.id === contactId);
  if (!contactById.length) {
    return null;
  }
  return contactById[0];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const restList = await contacts.filter((contact) => contact.id !== contactId);

  const index = contacts.findIndex((element) => element.id === contactId);
  if (index === -1) {
    return null;
  }

  const stringifiedData = [JSON.stringify(restList, null, 2)];
  fs.writeFile(contactsPath, stringifiedData);
  return restList;
};
// removeContact("ss-0Rw").then((data) => console.log(data));

const addContact = async (body) => {
  const { name, email, phone } = body;
  const validatedData = dataValidator({ name, email, phone });
  if (validatedData.error) {
    console.log(validatedData.error);
    return null;
  }
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...{ name, email, phone } };

  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

// addContact({ name: "ivan", phone: "09873" }).then((data) => console.log(data));

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const { name, email, phone } = body;
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const validatedData = dataValidator({ name, email, phone });
  // console.log(validatedData.value);
  if (validatedData.error) {
    // console.log(validatedData.error);
    return undefined;
  }

  contacts[index] = { id: contactId, ...body };
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

// updateContact("vza2RIzNGIwutCVCs4mCL", {
//   name: "ivan",
//   email: "ivan@gmail.com",
//   phone: "09873",
// }).then((data) => console.log(data));

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
