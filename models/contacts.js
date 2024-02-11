import { nanoid } from "nanoid";
import { validateContact } from "./schemaJoi.js";
import { writeContacts, readContacts, findContactIndexById } from "./utils.js";

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

  const { error } = validateContact(body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
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
};

export const updateContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;

  const { error } = validateContact(body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

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
};
