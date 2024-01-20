import { remove } from "../services/contacts.helpers.js";

export async function deleteContact(req, res, next) {
  try {
    const id = req.params.contactId;
    const deleted = await remove(id);
    return deleted
      ? res.status(200).json({ message: "Contact deleted" })
      : res.status(404).json({ message: "Not found" });
  } catch (e) {
    return res.status(500).json(`An error occured: ${e.message}`);
  }
}
