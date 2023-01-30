import { listContacts } from "../../models/contacts";

export const getAll = async (_, res) => {
  const result = await listContacts();
  res.json(result);
};
