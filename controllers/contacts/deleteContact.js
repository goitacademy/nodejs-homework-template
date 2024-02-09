import { removeContact } from "../../models/contacts.js";

export async function deleteContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const isDelete = await removeContact(contactId);
    if (!isDelete) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(200).json({ message: "Contact deleted" });
    }
  } catch (error) {
    res.status(500).json(`Error message: ${error}`);
  }
}
