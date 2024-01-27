import { Contact } from '#models/schemas/contact.js';

export async function updateContacts(req, res, next) {
    const { contactId } = req.params;
    try {
      const body = req.body;
      const isBodyEmpty = Object.keys(body).length === 0;
      if (isBodyEmpty) {
        return res.status(400).json({ message: 'Missing fields' });
      }
      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        { $set: body },
        { new: true }
      );
      updatedContact !== null ? res.status(200).json(updatedContact) : next();
    } catch (error) {
      next(error);
    }
  }