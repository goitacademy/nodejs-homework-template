const req = require("express/lib/request");
const uniqid = require("uniqid");
const fs = require("fs").promises;
const uniqId = uniqid();
const listContacts = async () => {
  const data = await fs.readFile("./models/contacts.json", "utf8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await fs.readFile("./models/contacts.json", "utf8");
  return JSON.parse(data).map((contact) => {
    if (contactId === contact.id) {
      return contact;
    }
  });
};

const removeContact = async (contactId) => {
  const data = await fs.readFile("./models/contacts.json", "utf8");
  const contactsWithoutRemovedContact = JSON.parse(data).filter(
    (contact) => contact.id !== contactId
  );
  return contactsWithoutRemovedContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const data = await fs.readFile("./models/contacts.json", "utf8");
  console.log(
    JSON.stringify([...JSON.parse(data), { uniqId, name, email, phone }])
  );
  return JSON.stringify([...JSON.parse(data), { uniqId, name, email, phone }]);
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const data = await fs.readFile("./models/contacts.json", "utf8");
  const parsedData = JSON.parse(data);
  console.log(body);
  return parsedData.forEach((contact) => {
    if (contactId === contact.id) {
      contact.name = name;
      contact.name = email;
      contact.name = phone;
      // if (name) {
      //   contact.name = name;
      // }
      // if (email) {
      //   contact.name = email;
      // }
      // if (phone) {
      //   contact.name = phone;
      // }
      return { contactId, name, email, phone };
    }
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
