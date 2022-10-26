const fs = require("fs/promises");


const path = require("path");
const { nanoid } = require("nanoid");
const { json } = require("express");

const contactspath = path.join(__dirname, "/contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactspath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactspath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};
const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };

  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};
const updateById = async (id, body) => {

  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  contacts[index] = { id, ...body };
  await updateContacts(contacts);
  return contacts[index];

};

module.exports = {
  listContacts,
  getContactById,
  addContact,
removeContact,
  updateById,

};
