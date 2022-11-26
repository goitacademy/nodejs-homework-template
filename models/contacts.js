const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");
const contactPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactPath, "utf8");
  const result = await JSON.parse(contacts);
  return result;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id.toString());
  return result;
};

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex !== -1) {
    contacts[contactIndex].name = name;
    contacts[contactIndex].email = email;
    contacts[contactIndex].phone = phone;
    await fs.writeFile(contactPath, JSON.stringify(contacts));
    return contacts[contactIndex];
  } else {
    return null;
  }
};

const removeContact = async (id) => {
  const contactForDell = await getContactById(id);
  if (contactForDell) {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactForDell.id
    );
    await fs.writeFile(contactPath, JSON.stringify(filteredContacts));
    return contactForDell;
  } else {
    return null;
  }
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactPath, JSON.stringify(newContacts));
  console.table(
    `New contact: ${name}, email: ${email}, phone: ${phone} was created!`
  );

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  updateContact,
  removeContact,
  addContact,
};
