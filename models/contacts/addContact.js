const listContacts = require("./listContacts");
const fs = require("fs").promises;
const filePath = require("./filePath");
const { v4 } = require("uuid");

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(filePath, JSON.stringify(newContacts));
  console.table(
    `New contact: ${name}, email: ${email}, phone: ${phone} was created!`
  );

  return newContact;
};

module.exports = addContact;
