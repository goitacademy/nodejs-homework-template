import service from "../../service/schemas/contact.js";

async function showContacts(req, res, next) {
  try {
    const contact = await service.getByIdContact(req.params.id);
    if (contact) {
      return res.status(200).json(contact);
    }
    throw new Error("Not found");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
