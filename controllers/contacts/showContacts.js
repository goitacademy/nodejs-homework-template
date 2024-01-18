import { Contacts } from "#models/contacts.shema.js";

async function showContacts(req, res, next) {
  const contactId = req.params.contactId;
  try {
    const contact = await Contacts.findById(contactId);
    if (contact) {
      return res.json(contact);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(`An error occurred: ${e}`);
  }
}

export { showContacts };
