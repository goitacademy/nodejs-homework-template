const fs = require("fs/promises");
const getAll = require("./getAll");
const { v4: uuidv4 } = require("uuid");
const contactsPath = require("./contactsPath");

const add = async (data) => {
  const contacts = await getAll();
  const newContact = { data, id: uuidv4() };
  const newArray = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newArray));
  return newContact;
};

module.exports = add;
