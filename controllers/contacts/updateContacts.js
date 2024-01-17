import { updateContact } from "#models/contacts.js";

async function updateContacts(req, res, next) {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const updatedContact = await updateContact(contactId, {
      name,
      email,
      phone,
    });
    if (updatedContact) {
      return res.status(200).json(updatedContact);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(`An error occurred: ${e}`);
  }
}

export { updateContacts };
