import Contact from "#models/contactModel.js";

export async function updateContacts(req, res, next) {
  const contactId = req.params.contactId;
  const { name, email, phone } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { name, email, phone },
      { new: true } // Zwraca zaktualizowany dokument
    );

    if (updatedContact) {
      return res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
