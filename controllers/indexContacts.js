import service from "../service/schemas/contact.js";

async function indexContacts(req, res, next) {
  try {
    const contacts = await service.getAllContacts();
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
