import { listContacts } from "../../models/contacts.js";

export const getContacts = async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    return res.status(200).json(allContacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
