import Contact from "#models/contactModel.js";

export async function showContacts(req, res, next) {
  const contactId = req.params.contactId;

  try {
    const contact = await Contact.findById(contactId);

    if (contact) {
      res.json(contact);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
