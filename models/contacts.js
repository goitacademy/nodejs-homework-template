const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const Joi = require("joi");

const contactsPath = path.resolve("models/contacts.json");

const schema = Joi.object({
  name: Joi.string().min(2).max(40).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  phone: Joi.string().min(7).max(20),
});

const listContacts = async () => {
  try {
    const contactList = await fs.readFile(contactsPath, "utf-8");
    return { status: "OK", code: "200", data: JSON.parse(contactList) };
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
};

const getContactById = async (contactId) => {
  try {
    const contactList = await fs.readFile(contactsPath, "utf-8");
    const contact = JSON.parse(contactList).filter(
      (item) => item.id === contactId
    );
    if (!contact.length) {
      throw new Error("Not found");
    }
    return { status: "success", code: "200", data: contact };
  } catch (error) {
    return { status: "ERROR", code: "404", message: error.message };
  }
};

const removeContact = async (contactId) => {
  try {
    const contactList = await fs.readFile(contactsPath, "utf-8");
    const updatedContacts = JSON.parse(contactList).filter(
      (item) => item.id !== contactId
    );

    if (JSON.parse(contactList).length === updatedContacts.length) {
      throw new Error();
    }

    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf-8");
    return { status: "OK", code: "200", message: "Contact deleted" };
  } catch (error) {
    return { status: "ERROR", code: "404", message: "Not found" };
  }
};

const addContact = async (body) => {
  try {
    const contactList = await fs.readFile(contactsPath, "utf-8");
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      throw new Error("Missing required field");
    }

    const validationResult = schema.validate(body);
    if (validationResult.error) {
      throw new Error(validationResult.error);
    }

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const updatedContactList = [...JSON.parse(contactList), newContact];
    fs.writeFile(contactsPath, JSON.stringify(updatedContactList), "utf-8");
    return { status: "created", code: "201", data: newContact };
  } catch (error) {
    return { status: "ERROR", code: "400", message: error.message };
  }
};

const updateContact = async (contactId, body) => {
  try {
    if (!Object.keys(body).length) {
      throw new Error("Missing fields");
    }

    const validationResult = schema.validate(body);
    if (validationResult.error) {
      throw new Error(validationResult.error);
    }

    const contactList = await fs.readFile(contactsPath, "utf-8");
    const parsedContactList = JSON.parse(contactList);
    const { name, email, phone } = body;
    const index = parsedContactList.findIndex(
      (contact) => contact.id === contactId
    );
    if (index < 0) {
      return { status: "ERROR", code: "404", message: "Not found" };
    }

    const contactToUpdate = parsedContactList[index];
    contactToUpdate.name = name;
    contactToUpdate.email = email;
    contactToUpdate.phone = phone;

    fs.writeFile(contactsPath, JSON.stringify(parsedContactList), "utf-8");
    return { status: "OK", code: "200", data: contactToUpdate };
  } catch (error) {
    return { status: "ERROR", code: "400", message: error.message };
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
