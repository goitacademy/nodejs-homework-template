const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const Joi = require("joi");
const myCustomJoi = Joi.extend(require("joi-phone-number"));

const contactPath = path.join(__dirname, "..", "db", "contacts.json");

const schema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: myCustomJoi.string().phoneNumber().required(),
});

const readDB = async () => {
  const result = await fs.readFile(contactPath);
  return JSON.parse(result);
};
const writeDB = async (data) => {
  await fs.writeFile(contactPath, JSON.stringify(data, null, 4));
};

const listContactsService = async () => {
  return await readDB();
};

const getByIdService = async (id) => {
  const contacts = await readDB();
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) {
    throw new Error("Contact not found");
  }
  return contact;
};

const addContactService = async ({ name, email, phone }) => {
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  const { error } = schema.validate(newContact);
  if (error) {
    throw new Error(error);
  }
  const contacts = await readDB();
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 4));
  return newContact;
};

const updateContactService = async (id, body) => {
  const contacts = await readDB();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex === -1) {
    throw new Error("Contact not found");
  }
  const { error } = schema.validate(body);

  if (error) {
    throw new Error(error);
  }
  contacts.splice(contactIndex, 1, { ...contacts[contactIndex], ...body });
  await writeDB(contacts);
  return contacts[contactIndex];
};

const removeContactService = async (id) => {
  const contacts = await readDB();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex === -1) {
    throw new Error("Contact not found");
  }
  const [deletedContact] = contacts.splice(contactIndex, 1);
  await writeDB(contacts);
  return deletedContact;
};

module.exports = {
  listContactsService,
  getByIdService,
  addContactService,
  updateContactService,
  removeContactService,
};
