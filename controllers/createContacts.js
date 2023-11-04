import service from "../service/schemas/contact.js";

async function createContacts(req, res, next) {
  try {
    const newContact = await service.createContact(req.body);
    return res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
