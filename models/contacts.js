import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join(process.cwd(), "models/contacts.json");

const readContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const writeContacts = async (contactsParsed) => {
  await fs.writeFile(contactsPath, JSON.stringify(contactsParsed, null, 2));
};

const findContactIndexById = async (contactId) => {
  const contactsParsed = await readContacts();
  return contactsParsed.findIndex((contact) => contact.id === contactId);
};

export const listContacts = async (_, res, next) => {
  try {
    const contactsParsed = await readContacts();
    res.json(contactsParsed);
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const contactsParsed = await readContacts();
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
    const contactIndex = await findContactIndexById(contactId);
    if (contactIndex !== -1) {
      const contactsParsed = await readContacts();
      const removedContact = contactsParsed.splice(contactIndex, 1)[0];
      await writeContacts(contactsParsed);
      res.json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "contact not Found" });
    }
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  const body = req.body;
  const requiredFields = ["name", "email", "phone"];
  const missingFields = requiredFields.filter((field) => !(field in body));
  if (missingFields.length > 0) {
    const errorMessage = `Missing required field(s): ${missingFields.join(
      ", "
    )}`;
    res.status(400).json({ message: errorMessage });
  } else {
    const newContact = {
      id: nanoid(21),
      name: body.name,
      email: body.email,
      phone: body.phone,
    };
    try {
      const contactsParsed = await readContacts();
      contactsParsed.push(newContact);
      await writeContacts(contactsParsed);
      res.status(201).json(newContact);
    } catch (error) {
      next(error);
    }
  }
};

export const updateContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;
  const requiredFields = ["name", "email", "phone"];
  const missingFields = requiredFields.filter((field) => !(field in body));
  if (missingFields.length > 0) {
    const errorMessage = `Missing required field(s): ${missingFields.join(
      ", "
    )}`;
    res.status(400).json({ message: errorMessage });
  } else {
    try {
      const contactIndex = await findContactIndexById(contactId);
      if (contactIndex === -1) {
        return res.status(404).json({ message: "Not found" });
      }
      const contactsParsed = await readContacts();
      Object.assign(contactsParsed[contactIndex], body);
      await writeContacts(contactsParsed);
      res.json(contactsParsed[contactIndex]);
    } catch (error) {
      next(error);
    }
  }
};
