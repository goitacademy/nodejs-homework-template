import { RequestError } from "../../helpers/RequestError.js";
import { updateContact } from "../../models/contacts.js";

export const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (result === null) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};
