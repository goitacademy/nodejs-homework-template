const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { contactSchema } = require("../middlewares/validation");

const contactsPath = path.join(__dirname, "./contacts.json");

const readContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

exports.listContacts = async () => {
  const data = await readContacts();
  return data;
};

exports.getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find((c) => c.id === contactId);
  return contact;
};

exports.removeContact = async (contactId) => {
  const contacts = await readContacts();
  const updatedContacts = contacts.filter((c) => c.id !== contactId);
  await writeContacts(updatedContacts);
};

exports.addContact = async (body) => {
  const { name, email, phone } = body;
  const { error } = contactSchema.validate(body);

  if (error) {
    throw new Error(error.details[0].message);
  }

  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  const contacts = await readContacts();
  contacts.push(newContact);
  await writeContacts(contacts);

  return newContact;
};

exports.updateContact = async (contactId, updatedData) => {
  const contacts = await readContacts();
  const contactIndex = contacts.findIndex((c) => c.id === contactId);

  if (contactIndex === -1) {
    throw new Error("Contact not found");
  }

  const updatedContact = {
    ...contacts[contactIndex],
    ...updatedData,
  };

  contacts[contactIndex] = updatedContact;
  await writeContacts(contacts);

  return updatedContact;
};
