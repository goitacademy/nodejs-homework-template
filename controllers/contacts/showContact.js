import { getContactById } from "../../models/contacts.js";

export const showContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contacts = await getContactById(contactId);
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
