const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const Joi = require("joi");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contactsRaw = await fs.readFile(contactsPath);
  const contatcs = JSON.parse(contactsRaw);
  return contatcs;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactToShow = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  return contactToShow;
};

const removeContact = async (contactId) => {
  const contatcs = await listContacts();
  const idList = contatcs.map((contact) => contact.id);
  if (idList.includes(contactId)) {
    const newContactsList = contatcs.filter(
      (contact) => contact.id !== contactId.toString()
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
    return newContactsList;
  } else {
    return null;
  }
};

const addContact = async (body) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.number().required(),
  });

  const { value, error } = schema.validate(body);
  const contatcs = await listContacts();
  const { name, email, phone } = body;
  if (!error) {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contatcs.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contatcs));
  }
  return { value, error };
};

const updateContact = async (contactId, body) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.number(),
  });
  const contacts = await listContacts();
  const { name, email, phone } = body;
  const idList = contacts.map((contact) => contact.id);
  if (idList.includes(contactId)) {
    const { error } = schema.validate(body);
    if (!error) {
      const contactToUpdate = contacts.find(
        (contact) => contact.id === contactId.toString()
      );
      if (name) {
        contactToUpdate.name = name;
      }
      if (email) {
        contactToUpdate.email = email;
      }
      if (phone) {
        contactToUpdate.phone = phone;
      }
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return contactToUpdate;
    } else {
      return error;
    }
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
