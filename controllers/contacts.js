const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { HttpError } = require("../helpers");
const { reqContactSchema } = require("../schemas/contact");

const contactsPath = path.resolve("models/contacts.json");

async function listContacts(req, res, next) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));

    if (!contacts) {
      throw HttpError(404, "Not found");
    }

    res.json(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContactById(req, res, next) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));

    const { id } = req.params;

    const contact = contacts.find((item) => item.id === id);

    if (!contact) {
      throw HttpError(404, "Not found");
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
}

async function addContact(req, res, next) {
  try {
    const { error } = reqContactSchema.validate(req.body);

    if (error) {
      const errorField = error.details.map((detail) => detail.context.key);

      throw HttpError(400, `missing required ${errorField} field`);
    }

    const contacts = JSON.parse(await fs.readFile(contactsPath));

    const newContact = { id: uuidv4(), ...req.body };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

async function removeContact(req, res, next) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    const { id } = req.params;

    const removedContact = contacts.findIndex(
      (contact) => contact.id === id.toString()
    );

    if (removedContact === -1) throw HttpError(404, "Not found");

    const newListContacts = contacts.filter(
      (contact) => contact.id !== id.toString()
    );

    await fs.writeFile(contactsPath, JSON.stringify(newListContacts, null, 2));

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res, next) {
  try {
    const { error } = reqContactSchema.validate(req.body);
    if (error) throw HttpError(400, "missing fields");

    const contacts = JSON.parse(await fs.readFile(contactsPath));
    const { id } = req.params;

    const contact = contacts.find((item) => item.id === id);
    if (!contact) throw HttpError(400, "Not found");

    const updatedContact = { id, ...req.body };

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
