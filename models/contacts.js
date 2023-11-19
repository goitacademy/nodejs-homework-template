const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");
const Joi = require("joi");

const filePath = path.join(__dirname, "contacts.json");

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

const validateData = (data, schema) => {
  const { error, value } = schema.validate(data);
  return error ? error.details[0].message : value;
};

const readContactsFile = async () => {
  const data = await fs.readFile(filePath);
  return JSON.parse(data.toString());
};

const listContacts = async () => readContactsFile();

const getContactById = async (contactId) => {
  try {
    const contacts = await readContactsFile();
    const foundContact = contacts.find((contact) => contact.id === contactId);

    if (!foundContact) {
      const notFoundError = new Error("Contact not found");
      notFoundError.status = 404;
      throw notFoundError;
    }

    return foundContact;
  } catch (err) {
    throw err;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await readContactsFile();

    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      const notFoundError = new Error("Contact not found");
      notFoundError.status = 404;
      throw notFoundError;
    }

    const newContacts = contacts.filter((contact) => contact.id !== contactId);

    return fs.writeFile(filePath, JSON.stringify(newContacts));
  } catch (err) {
    throw err;
  }
};

const addContact = async (body) => {
  const validatedData = validateData(body, createContactSchema);

  if (typeof validatedData === "string") {
    throw { status: 400, message: validatedData };
  }

  try {
    const { name, email, phone } = body;

    if (!name) {
      throw { status: 400, message: "Missing required field: name" };
    }
    if (!email) {
      throw { status: 400, message: "Missing required field: email" };
    }
    if (!phone) {
      throw { status: 400, message: "Missing required field: phone" };
    }

    const contacts = await readContactsFile();
    const existingContact = contacts.find((contact) => contact.email === email);
    if (existingContact) {
      throw {
        status: 400,
        message: "Contact with the same email already exists",
      };
    }
    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    await fs.writeFile(filePath, JSON.stringify(contacts));

    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  const validatedData = validateData(body, updateContactSchema);

  if (typeof validatedData === "string") {
    throw { status: 400, message: validatedData };
  }
  try {
    const { name, email, phone } = body;

    if (!name && !email && !phone) {
      throw { status: 400, message: "Missing fields" };
    }

    const contacts = await readContactsFile();

    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (contactIndex === -1) {
      throw { status: 404, message: "Not found" };
    }

    if (name) contacts[contactIndex].name = name;
    if (email) contacts[contactIndex].email = email;
    if (phone) contacts[contactIndex].phone = phone;

    await fs.writeFile(filePath, JSON.stringify(contacts));

    return contacts[contactIndex];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
