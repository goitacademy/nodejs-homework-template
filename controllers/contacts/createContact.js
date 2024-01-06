import { addContact } from "../../models/contacts.js";

export const createContact = async (req, res, next) => {
  const body = req.body;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  try {
    const contact = await addContact(body);
    return res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
