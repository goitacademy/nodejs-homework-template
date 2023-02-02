import { getContactById } from "../../models/contacts.js";

export const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  res.json(result);
};
