const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const HttpError = require("../utils/httpError");
const {validateBody, validateData} = require("../utils/validateData");
const addSchema = require("../utils/validateSchema");

const contactsPath = path.join(__dirname, "contacts.json");


const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};


const getAllContacts = async (_, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (e) {
    next(e);
  }
};


const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await listContacts();
    const currentContact = contacts.find(({ id }) => id === contactId);
    if (!currentContact) {
      throw HttpError(404, "Not found");
    }
    res.json(currentContact);
  } catch (e) {
    next(e);
  }
};


const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await listContacts();
    const deletedContact = await removeContactFromJson(contacts, contactId);
    if (!deletedContact) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "contact deleted",
    });
  } catch (e) {
    next(e);
  }
};


const addContact = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    const { error } = addSchema.validate(req.body);
    if (error) {
      validateBody(error, res);
      return;
    }
    const { name, email, phone } = req.body;
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    res.status(201).json(newContact);
  } catch (e) {
    next(e);
  }
};


const updateContact = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    const { contactId } = req.params;
    const body = req.body;
    validateData(body, req, res);
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      throw HttpError(404, "Not found");
    }
    const updatedContact = {
      ...contacts[index],
      ...body,
    };
    contacts[index] = { ...contacts[index], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    res.json(updatedContact);
  } catch (e) {
    next(e);
  }
};


const removeContactFromJson = async (contacts, contactId) => {
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};