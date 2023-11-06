import { getByIdContact } from "#services/index.js";

export async function showContacts(req, res, next) {
  try {
    const contact = await getByIdContact(req.params.id);
    if (contact) {
      return res.status(200).json(contact);
    }
    throw new Error("Not found");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
