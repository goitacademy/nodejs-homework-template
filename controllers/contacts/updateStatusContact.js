import { Contact } from "#schemas/contact.js";
import { favoriteSchema } from "#schemas/favorite.js";

export async function updateStatusContacts(req, res, next) {
  try {
    const { contactId } = req.params;
    const validationResult = favoriteSchema.validate(req.body);

    if (validationResult.error) {
      res.status(400).json({
        message: `missing field favorite`,
        error: validationResult.error,
      });
      return;
    }

    const contactToUpdate = await Contact.findByIdAndUpdate(
      { _id: contactId },
      req.body,
      { new: true }
    );

    contactToUpdate
      ? res.status(200).json({ contactToUpdate })
      : res.status(404).json({ message: `Not found contact id: ${contactId}` });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
}
