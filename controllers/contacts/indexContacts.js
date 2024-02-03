import { listContacts } from "../../models/contacts.js";

async function indexContacts(req, res, next) {
  try {
    const contactList = await listContacts();
    res.status(200).json({ contactList });
  } catch (error) {
    next(error);
  }
}

export { indexContacts };
