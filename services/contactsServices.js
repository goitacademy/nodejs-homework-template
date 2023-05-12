const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const { HttpError } = require("../utils/HttpError");
const { validateSchema } = require("../schema");

const contactsPath = path.join(process.cwd(), "models", "contacts.json");

const getContactsService = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactService = async (id) => {
  const contacts = await getContactsService();
  return contacts.find((contact) => contact.id === id);
};

const createContactService = async (data) => {
  const { error } = validateSchema.validate(data);
    if (error) {
    throw new HttpError(400, "missing required name field");
  }
  const contacts = await getContactsService();
  const newContact = { id: crypto.randomUUID(), ...data };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContactService = async (id, data) => {
    const { error } = validateSchema.validate(data);
    if (error) {
    throw new HttpError(400, "missing fields");
  }
  const contacts = await getContactsService();
  const [editedContac] = contacts.filter((contact) => contact.id === id);
  if (!editedContac) {
    throw new HttpError(404, "Contac is not found");
  }
  editedContac.name = data.name || editedContac.name;
  editedContac.email = data.email || editedContac.email;
  editedContac.phone = data.phone || editedContac.phone;
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(editedContac)
  return editedContac;
};

const deleteContactService = async (id) => {
  const contacts = await getContactsService();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    throw new HttpError(404, "Contact is not found");
  }
  const [deletedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
};

module.exports = {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
};