import fs from "fs/promises";
import path from "path";
const contactsPath = path.join(process.cwd(), "models/contacts.json");

export const listContacts = async (req, res, next) => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactsParsed = JSON.parse(contacts);
    res.send(contactsParsed);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};
