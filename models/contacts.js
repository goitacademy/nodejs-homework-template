const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { nanoid } = require("nanoid");
const Joi = require("joi");

const validatinsContact = (data) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
      .required(),
    phone: Joi.string().alphanum().min(3).max(30).required(),
  });
  const validationResult = schema.validate(data);
  return validationResult;
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  return allContacts;
};

const getContactById = async (contactId) => {
  const conacts = await listContacts();
  const contactById = conacts.find((item) => item.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
};

const removeContact = async (contactId) => {
  const conacts = await listContacts();
  const removeId = conacts.findIndex((item) => item.id === contactId);
  if (removeId === -1) {
    return null;
  }
  const [removeContact] = conacts.splice(removeId, 1);
  await fs.writeFile(contactsPath, JSON.stringify(conacts));
  return removeContact;
};

const addContact = async ({ name, email, phone }) => {
  const data = { name, email, phone };
  const conacts = await listContacts();
  const validation = validatinsContact(data);
  if (!validation.error) {
    const newContact = { id: nanoid(3).toString(), ...data };
    conacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(conacts));
    return newContact;
  }
  return null;
};

const updateContact = async (contactId, body) => {
  const conacts = await listContacts();
  const { name, email, phone } = body;
  const validation = validatinsContact(body);
  if (!validation.error) {
    conacts.forEach((contact) => {
      if (contact.id === contactId) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(conacts));
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
