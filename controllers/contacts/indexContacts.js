import { Contact } from "#schemas/contact.js";

export async function indexContacts(req, res, next) {
  try {
    const result = await Contact.find();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
