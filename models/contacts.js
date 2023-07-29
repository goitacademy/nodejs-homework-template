const fs = require("fs");
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");
const ContactList = fs.readFileSync(contactsPath, "utf-8");
const contacts = JSON.parse(ContactList);
const { nanoid } = require("nanoid");
const id = nanoid();
const Joi = require("joi");

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = contacts.find((contact) => contact.id === contactId);
  if (contact) {
    return contact;
  }
};

const removeContact = async (contactId) => {
  const newContacts = contacts.filter((contact) => contact.id !== contactId);

  if (newContacts.length === contacts.length) {
    console.log("error");
    return contacts;
  }

  fs.writeFile(contactsPath, JSON.stringify(newContacts), (error) => {
    if (error) {
      return console.log("error :", error);
    }
  });
  return newContacts;
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const schema = Joi.object({
    phone: Joi.number().min(100000000),
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "pl"] },
    }),
  });

  try {
    await schema.validateAsync({
      username: name,
      email: email,
      phone: phone,
    });
    contacts.push({
      id: id,
      name,
      email,
      phone,
    });
  } catch (err) {
    console.log("validation failed: ");
    return console.table(err.details);
  }

  fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
    if (error) {
      return console.log(error);
    }
  });

  return contacts;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  const schema = Joi.object({
    phone: Joi.number().min(100000000),
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "pl"] },
    }),
  });

  try {
    await schema.validateAsync({
      username: name,
      email: email,
      phone: phone,
    });
    await contacts.find((contact) => {
      if (contact.id === contactId) {
        if (name !== contact.name && name) {
          contact.name = name;
        }
        if (email !== contact.email && email) {
          contact.email = email;
        }
        if (phone !== contact.phone && phone) {
          contact.phone = phone;
        }
      }
    });
  } catch (err) {
    console.log("validation failed: ");
    console.table(err.details);
    return { message: "validationError", err };
  }

  fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
    if (error) {
      return console.log(error);
    }
  });
  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
