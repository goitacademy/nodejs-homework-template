import { Contacts } from "#models/contacts.shema.js";

async function deleteContacts(req, res, next) {
  const contactId = req.params.contactId;
  try {
    const contactToDelete = await Contacts.findByIdAndDelete(contactId);
    if (contactToDelete) {
      res.status(200).json({ message: "Contact Deleted" });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(`An error occurred: ${e}`);
  }
}

export { deleteContacts };
