import { updateContactSchema } from "../../routes/api/validators/updateContactSchema.js";
import { updateContact } from "../../repositories/contacts/updateContact.js";

export async function updateContacts(req, res, next) {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const { contactId } = req.params;
      const body = req.body;
      const updated = await updateContact(contactId, body);

      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
