import { getById } from "../../models/contacts.js";

export async function showContactById(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await getById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(200).json(contact);
    }
  } catch (error) {
    res.status(500).json(`Error message: ${error}`);
  }
}
