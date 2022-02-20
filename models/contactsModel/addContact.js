const { randomUUID } = require("crypto");
const DB = require("../db");
const db = new DB("contacts.json");

const addContact = async (body) => {
  const contacts = await db.read();
  const newContact = {
    id: randomUUID(),
    ...body,
  };
  contacts.push(newContact);
  await db.write(contacts);
  return newContact;
};

module.exports = addContact;
