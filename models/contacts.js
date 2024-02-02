import fs from "fs/promises";
import path from "path";
const contactsPath = path.join(process.cwd(), "models/contacts.json");

export const listContacts = async (_, res, next) => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactsParsed = JSON.parse(contacts);
    res.json(contactsParsed);
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactsParsed = JSON.parse(contacts);
    const findId = contactsParsed.find((contact) => contact.id === contactId);
    if (findId) {
      res.json(findId);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const removeContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactsParsed = JSON.parse(contacts);
    const contactIndex = contactsParsed.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex !== -1) {
      const removedContact = contactsParsed.splice(contactIndex, 1)[0];
      await fs.writeFile(contactsPath, JSON.stringify(contactsParsed, null, 2));
      res.json(removedContact);
    } else {
      res.status(404).json({ message: "contact not Found" });
    }
  } catch (error) {
    next(error);
  }
};
const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};
