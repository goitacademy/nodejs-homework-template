import { addContact } from "../../models/contacts.js";
import { schema } from "../../validators/createContactValidators.js";
export async function createContact(req, res, next) {
  const { name, email, phone } = req.body;
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({ message: result.error.message });
  }
  const contact = await addContact({ name, email, phone });
  res.status(201).json({ contact });
}
