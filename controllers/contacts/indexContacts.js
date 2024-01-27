import { Contact } from '#models/schemas/contact.js';

export async function indexContacts(req, res, next) {
  try {
    const contacts = await Contact.find();
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}