const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");
const Joi = require("joi");

const contactsPath = path.join(__dirname, "./contacts.json");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const validateContact = (contact) => {
  return contactSchema.validate(contact);
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(({ id }) => id.toString() === contactId);
    return contactById;
  } catch (error) {
    console.log("Error:", error);
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  let deletedContact = {};

  const newContacts = contacts.filter((contact) => {
    if (contact.id.toString() === contactId) {
      deletedContact = {
        ...contact,
      };
      return false;
    } else {
      return true;
    }
  });

  await fs.writeFile(contactsPath, JSON.stringify(newContacts));

  return deletedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContactBody = {
    ...body,
    id: shortid.generate(),
  };

  const validationResult = validateContact(newContactBody);

  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }

  const newData = [...contacts, newContactBody];

  await fs.writeFile(contactsPath, JSON.stringify(newData));

  return newContactBody;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  let newContact = {};

  const newContacts = contacts.map((contact) => {
    if (contact.id.toString() === contactId) {
      newContact = {
        ...contact,
        ...body,
      };

      const validationResult = validateContact(newContact);

      if (validationResult.error) {
        throw new Error(validationResult.error.message);
      }

      return newContact;
    } else {
      return contact;
    }
  });

  await fs.writeFile(contactsPath, JSON.stringify(newContacts));

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
