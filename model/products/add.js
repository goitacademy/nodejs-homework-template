const { v4: uuid } = require("uuid");
const fs = require("fs/promises");
const filePath = require("./filePath");
const listContacts = require("./getAll");

const addContact = async (body) => {
  const contacts = await listContacts();
  const id = uuid();
  const newContact = {
    id,
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact;
};

module.exports = addContact;
