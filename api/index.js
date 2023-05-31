const express = require('express');
// const Joi = require('joi');

// const contacts = require('../../models/contacts');
// const { HttpError } = require('../../helpers');

const router = express.Router();

// const schema = require('../../sevice/schemas/validation')
const ctrlContact = require('../controller');

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().regex(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/).messages({'string.pattern.base': `Phone number must be digits and can contain spaces, dashes, parentheses and can start with +`}).required(),
// });

router.get('/contacts', ctrlContact.get);

router.get('/contacts/:id', ctrlContact.getById);

router.post('/contacts', ctrlContact.create);

router.put('/contacts/:id', ctrlContact.update);

router.patch('/contacts/:id/favorite', ctrlContact.updateFavorite);

router.delete('/contacts/:id', ctrlContact.remove);

module.exports = router;

// router.get('/', async (req, res, next) => {
//   try {
//       const result = await contacts.listContacts();
//       res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.getContactById(contactId);
//     if (!result) {
//       throw HttpError(404, 'Not found');
//     }
//     res.status(200).json(result);
    
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/', async (req, res, next) => {
//   try {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       // throw HttpError(400, error.message);
//       res.status(400).json({
//       message: 'Missing required name field'
//     });
//     }
//     const result = await contacts.addContact(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.removeContact(contactId);
//     if (!result) {
//       res.status(404).json({
//       message: 'Not found'
//     });
//     }
//     res.status(200).json({
//       message: 'Contact deleted'
//     })
//   } catch (error) {
//     next(error);
//   }
// });

// router.put('/:contactId', async (req, res, next) => {
//   try {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       res.status(400).json({
//       message: 'Missing fields'
//     });
//     }
//     const { contactId } = req.params;
//     const result = await contacts.updateContact(contactId, req.body);
//     if (!result) {
//       res.status(404).json({
//       message: 'Not found'
//     });
//     }
//     res.status(200).json(result);  
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;
