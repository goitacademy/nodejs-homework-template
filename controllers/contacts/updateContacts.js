import { updateContact } from '../../models/contacts.js';
import Joi from "joi";

const contactSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

async function updateContacts(req, res, next) {
  const { contactId } = req.params;
  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedContact = await updateContact(contactId, req.body);

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
}

export { updateContacts };

// router.put('/api/contacts/:contactId', async (req, res, next) => {
//     const { contactId } = req.params;
//     const { error } = contactSchema.validate(req.body);
  
//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }
  
//     try {
//       const updatedContact = await updateContact(contactId, req.body);
  
//       if (updatedContact) {
//         res.status(200).json(updatedContact);
//       } else {
//         res.status(404).json({ message: 'Not found' });
//       }
//     } catch (error) {
//       next(error);
//     }
//   });