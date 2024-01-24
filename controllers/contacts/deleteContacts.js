import { Contact } from "#schemas/contact.js";

export async function deleteContacts(req, res, next) {
  try {
    const { contactId } = req.params;

    const contactToRemove = await Contact.findByIdAndDelete({ _id: contactId });

    contactToRemove
      ? res.status(200).json({ message: "Contact deleted" })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
}
