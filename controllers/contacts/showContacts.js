import { Contact } from '#models/schemas/contact.js';

export async function showContact(req, res, next) {
    const { contactId } = req.params;
    try {
        const contact = await Contact.findById(contactId);
        contact ? res.status(200).json(contact) : next();
      } catch (error) {
        next(error);
    }
  }