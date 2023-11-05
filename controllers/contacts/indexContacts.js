import Contact from "../../models/contactModel.js";

export async function indexContacts(req, res, next) {
  try {
    const contacts = await Contact.find();
    return res.json(contacts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
