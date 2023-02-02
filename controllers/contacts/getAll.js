import { listContacts } from "../../models/contacts.js";

export const getAll = async (_, res) => {
  const result = await listContacts();
  res.json(result);
};
