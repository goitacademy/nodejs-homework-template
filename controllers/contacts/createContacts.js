import { nanoid } from "nanoid";

import { addContact } from "#models/contacts.js";

async function createContacts(req, res, next) {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const id = nanoid();
    const newContact = await addContact({ id, name, email, phone });
    return res.status(201).json(newContact);
  } catch (e) {
    console.log(e);
    res.status(500).json(`An error occurred: ${e}`);
  }
}

export { createContacts };
