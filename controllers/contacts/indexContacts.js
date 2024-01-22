import { listContacts } from "../../models/contacts.js";

const getAllContacts = async (req, res, next) => {
  const contactsList = await listContacts();
  res.json({ status: 200, body: contactsList });
};

export { getAllContacts };
