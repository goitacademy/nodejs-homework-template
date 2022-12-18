const path = require("path");
const fs = require("fs").promises;
// const nanoid = require("nanoid");
// const Joi = require("joi");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath));
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  if (!name || !email || !phone) return null;
  console.log(name, email, phone);

    // const schema = Joi.object({
  //   name: Joi.string().alpha().min(3).max(30).required(),
  //   email: Joi.string()
  //     .email({
  //       minDomainSegments: 2,
  //       tlds: {
  //         allow: ["com", "net"],
  //       }.required(),
  //     })
  //     .required(),
  //   phone: Joi.string()
  //     .regex(/^[0-9]{10}$/)
  //     .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
  //     .required(),
  // }).with("name", "email", "phone");
  // const validationResult = schema.validate(body);
  //  if (!validationResult ) return 0;

  const contacts = JSON.parse(await fs.readFile(contactsPath));
  const newId = 11
  // const newId = nanoid();
  // const newId = parseInt(contacts[contacts.length - 1].id) + 1;
  const newContact = {
    id: newId.toString(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
