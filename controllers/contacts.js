import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import Contact from "../models/contact.js";
import HttpError from "../helpters/HttpError.js";

const contacsPath = path.resolve("controllers", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(contacsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async (req, res, next) => {
  try {
    const allContacts = await Contact.find();

    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const foundContact = await Contact.findById(contactId);

    if (!foundContact) {
      throw HttpError(404);
    }

    res.json(foundContact);
  } catch (error) {
    next(error);
  }
};

export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [contactToRemove] = contacts.splice(index, 1);

  await updateContacts(contacts);

  return contactToRemove;
};

export const updateContactById = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { contactId, name, email, phone };

  await updateContacts(contacts);

  return contacts[index];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
