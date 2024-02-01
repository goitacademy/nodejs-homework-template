// controllers/contacts/updateStatusContact.js
import { updateStatusContact } from "#models/contacts.js";

async function updateStatusContactController(req, res) {
  const { contactId } = req.params;
  const { body } = req;

  try {
    if (!body.hasOwnProperty("favorite")) {
      res.status(400).json({ message: "missing field favorite" });
      return;
    }

    const updatedContact = await updateStatusContact(contactId, body);

    res.status(200).json(updatedContact);
  } catch (err) {
    if (err.message === "Contact not found") {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
}

export { updateStatusContactController };
