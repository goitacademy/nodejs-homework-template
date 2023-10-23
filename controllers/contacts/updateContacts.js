import { updateContact } from "../../models/contacts.js";
import { updateSchema } from "../../validators/createContactValidators.js";

export async function updateContacts(req, res, next) {
  const { contactId } = req.params;

  const { error } = updateSchema.validate(req.body);
  const updateResult = await updateContact(contactId, req.body);
  if (error) {
    res.status(400).json({ message: error.message });
  }
  if (!updateResult) {
    res.status(404).json({ message: "contact not found" });
  }
  res.status(200).json({ updateResult });
}
