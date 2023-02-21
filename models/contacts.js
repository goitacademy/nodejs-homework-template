const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");


const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});


const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};


const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const res = contacts.find(({ id }) => id === contactId);
  return res;
};


const removeContact = async (contactId) => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const result = JSON.parse(contacts);
  const removedContact = result.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(removedContact), "utf8");
};


const addContact = async (body) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const result = JSON.parse(data);
  const newContact = {
    id: uuidv4(),
    ...body,
  };
  result.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(result), "utf8");
  return newContact;
};


const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, "utf8");
  let updatedContact = {};
  const contacts = JSON.parse(data).map((contact) => {
    if (contactId === contact.id) {
      updatedContact = {
        ...contact,
        ...body,
      };
      return updatedContact;
    }
    return contact;
  });
  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
  return updatedContact;
};

module.exports = {
  schema,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
