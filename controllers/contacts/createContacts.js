import { Contact } from '#models/schemas/contact.js';

export async function createContact(req, res, next) {
    try {
        const body = req.body;
        const newContact = await Contact.create(body);
        newContact ? res.status(201).json(newContact) : next();
      } catch (error) {
        next(error);
      }
    }