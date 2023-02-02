import { addContact } from "../../models/contacts.js";

export const add = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};
