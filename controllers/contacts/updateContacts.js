import { updateContact } from '../../models/contacts.js';
import Joi from '@hapi/joi';

const schemaSecond = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string(),
});

async function updateContacts(req, res, next) {
  try {
    const result = schemaSecond.validate(req.body);
    if (result.error) {
      return res.status(400).json({ message: result.error.message });
    }

    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const contactToUpdate = await updateContact(contactId, { name, email, phone });

    if (!contactToUpdate) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.status(200).json(contactToUpdate);
    }
  } catch (error) {
    res.status(500).json(`An error occured: ${error}`);
  }
}

export { updateContacts };
