import { addContact } from '../../models/contacts/contacts.js';
import { contactSchema } from './contactValidation.js';

async function createContacts(req, res, next) {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newContact = await addContact(req.body);

    return res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

export { createContacts };