const { randomUUID } = require("crypto");
const DB = require("../../db/db");
const db = new DB("../models/contacts.json");

const addContact = async (body) => {
  const contact = await db.read();
  const newContact = {
    id: randomUUID(),
    ...body,
  };
  contact.push(newContact);
  await db.write(contact);
  return newContact;
};

module.exports = {
  addContact,
};
