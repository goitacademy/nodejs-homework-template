import { Contact } from '#models/schemas/contact.js';

export async function deleteContact(req, res, next) {
    const { contactId } = req.params;
    try {
        const contact = await Contact.findByIdAndDelete(contactId);
        contact ? res.status(200).json({ message: 'Contact deleted' }) : next();
      } catch (error) {
        next(error);
    }
  }