import { Contact } from "#schemas/contact.js";
import { schema } from "#schemas/contacts.js";

export async function updateContacts(req, res, next) {
  try {
    const { contactId } = req.params;

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: `missing required field`,
        error: validationResult.error,
      });
    }

    const contactToUpdate = await Contact.findByIdAndUpdate(
      { _id: contactId },
      req.body,
      { new: true }
    );

    return contactToUpdate
      ? res.status(200).json({ contactToUpdate })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
}
