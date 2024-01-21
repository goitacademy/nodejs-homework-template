import { getContactById } from "../../models/contacts.js";

async function showContacts(req, res, next) {
  try {
    const contactId = await getContactById(req.params.contactId);
    if (!contactId) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ contactId });
  } catch (error) {
    next(error);
  }
}

export { showContacts };
