import { removeContact } from "#models/contacts.js";

async function deleteContacts(req, res, next) {
  const { id } = req.params;
  try {
    const contactToDelete = await removeContact(id);
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
