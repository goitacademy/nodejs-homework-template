import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

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

    const contacts = await fs.readFile(contactsPath);
    const contactsParsed = JSON.parse(contacts);

    contactsParsed.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contactsParsed, null, 2));
    res.status(201).json(newContact);
  }
};

const updateContact = async (contactId, body) => {};
