import { updateContact } from "../../models/contacts.js";

export const putContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  try {
    const contact = await updateContact(contactId, body);
    return res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
