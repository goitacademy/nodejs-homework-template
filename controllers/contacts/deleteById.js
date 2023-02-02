import { RequestError } from "../../helpers/RequestError.js";
import { removeContact } from "../../models/contacts.js";

export const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (result === null) {
    throw RequestError(404, "Not found");
  }
  res.json({ message: result });
};
