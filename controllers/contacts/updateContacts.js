import { updateContact } from "#services/contacts";

async function updateContacts(req, res, next) {
  const { contactId } = req.params;
  const { body } = req;

  try {
    const updatedContact = await updateContact(contactId, body);
    res.status(200).json(updatedContact);
  } catch (err) {
    if (err.name === "Contact not found") {
      res.status(404).json("Contact not found");
    } else {
      res.status(400).json({ message: err.message });
    }
  }
}

export { updateContacts };
