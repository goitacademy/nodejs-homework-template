const fs = require("fs/promises");
const path = require("node:path");
const nanoid = require("nanoid");

const contactsPath = path.resolve("./models/contacts.json");

const ERROR_CODES = {
  MISSING_FIELDS: 10,
  NOT_FOUND: 20,
  INVALID_PROPERTIES: 30,
};

const ACCEPTED_PROPERTIES = ["name", "email", "phone"];

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const jsonList = JSON.parse(data.toString());
  return jsonList;
};

const getContactById = async (contactId) => {
  const jsonList = await listContacts();
  if (jsonList.find((contact) => contact.id === contactId) === undefined) {
    throw `Sorry, there is no contact with contact ID ${contactId}!`;
  }
  const searchedContact = jsonList.find((contact) => contact.id === contactId);
  return searchedContact;
};

const removeContact = async (contactId) => {
  const jsonList = await listContacts();
  if (jsonList.find((contact) => contact.id === contactId) === undefined) {
    throw `Sorry, there is no contact with contact ID ${contactId}!`;
  }
  const newList = jsonList.filter((contact) => contact.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(newList));
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const jsonList = await listContacts();
  const newContact = { id: nanoid.nanoid(), name, email, phone };
  const newList = [...jsonList, newContact];
  fs.writeFile(contactsPath, JSON.stringify(newList));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const propertiesObject = { name, email, phone };

  if (
    Object.keys(propertiesObject).every(
      (key) => propertiesObject[key] === undefined
    )
  )
    throw { message: "Missing fields!", code: ERROR_CODES.MISSING_FIELDS };

  const invalidProperties = Object.keys(body).filter(
    (key) =>
      ACCEPTED_PROPERTIES.find((element) => element === key) === undefined
  );
  if (invalidProperties.length > 0)
    throw {
      message: `Invalid properties passed: ${invalidProperties.join(", ")}!`,
      code: ERROR_CODES.INVALID_PROPERTIES,
    };

  const jsonList = await listContacts();
  if (jsonList.find((contact) => contact.id === contactId) === undefined)
    throw {
      message: `Can't find the searched contact!`,
      code: ERROR_CODES.NOT_FOUND,
    };

  const contactToUpdate = jsonList.find((contact) => contact.id === contactId);
  Object.keys(body).forEach((key) => (contactToUpdate[key] = body[key]));
  fs.writeFile(contactsPath, JSON.stringify(jsonList));
  return contactToUpdate;
};

module.exports = {
  ERROR_CODES,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
