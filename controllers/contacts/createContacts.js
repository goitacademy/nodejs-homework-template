import { Contact } from "#schemas/contact.js";
import { schema } from "#schemas/contacts.js";

export async function createContacts(req, res, next) {
  try {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      res.status(400).json({
        message: `missing required field`,
        error: validationResult.error,
      });
      return;
    }

    const newContact = await Contact.create(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
}
