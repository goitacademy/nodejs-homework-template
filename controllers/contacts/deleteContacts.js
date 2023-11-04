import Contact from "../../models/contactModel.js";

export async function deleteContacts(req, res, next) {
  const contactId = req.params.contactId;

  try {
    const removedContact = await Contact.findByIdAndRemove(contactId);

    if (removedContact) {
      return res.json({ message: "Contact deleted" });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
