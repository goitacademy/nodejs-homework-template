import { removeContact } from "../../js/contacts.js";

export async function deleteContact(res, req, next) {
  try {
    const id = req.params.contactId;
    const deleted = await removeContact(id);
    deleted
      ? res.status(200).json({ message: "Contact deleted" })
      : res.status(404).json({ message: "Not found" });
  } catch (e) {
    res.status(500).json(`An error occured: ${e}`);
  }
}
