const express = require('express');

// const Joi = require('joi');

// const contacts = require('../../models/contact');

const ctrl = require('../../controller/contact');

const router = express.Router();

const {validateBody, isValidId} = require('../../middleware');

const {schema} = require('../../models/contact');


// const { HttpError } = require('../../helper');





router.get('/', ctrl.getAll);
// router.get('/:contactId', isValidId, ctrl.getById);
// router.post('/', validateBody(Contact.addSchema), ctrl.addContact);
// router.delete('/:contactId', isValidId, ctrl.deleteContactById);
// router.put('/:contactId', isValidId, validateBody(Contact.addSchema), ctrl.updateContactById);


// router.get('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.getContactById(contactId);
//     if(!result){
//       throw HttpError(404, 'Not found');
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/', async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if( error ){
//       throw HttpError(400, "Missing required name field");
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
//       const result = await contacts.removeContact(contactId);
//       if( !result ){
//         throw HttpError(404, 'Not found');
//       }
//     res.status(200).json({ message: "Contact deleted" });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.updateContact(contactId, req.body);
//     const { error } = addSchema.validate(req.body);
//     if( error){
//       throw HttpError(404, "Not found");
//     }
    
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
