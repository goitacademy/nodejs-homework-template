const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  try {
    const contactsJSON = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsJSON);
    return contacts;
  } catch {
    console.log("error when reading the file");
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((c) => c.id === contactId);
  if (index !== -1) {
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return { message: "contact deleted" };
  } else {
    return { message: "Not found" };
  }
};
const postBodyScheme = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
});

const addContact = async (body) => {
  const contacts = await listContacts();
  const validatedBody = postBodyScheme.validate(body);
  if (validatedBody.error?.details.length > 0) {
    return { message: "Your request is not in proper format." };
  }
  const { name, email, phone } = body;
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const putBodyScheme = Joi.object({
  email: Joi.string().email(),
  name: Joi.string(),
  phone: Joi.string(),
});

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((c) => c.id === contactId);
  const contactToUpdate = contacts[index];
  const validatedBody = putBodyScheme.validate(body);

  if (validatedBody.error?.details.length > 0) {
    return { message: "Your request is not in proper format." };
  }
  const updatedContact = { ...contactToUpdate, ...body };

  if (index !== -1) {
    contacts.splice(index, 1, updatedContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContact;
  } else {
    return { message: "Not found" };
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
