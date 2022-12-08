const express = require('express')

const contacts = require('../../models/contacts');

const { HttpError } = require("../../helpers");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required()
// })


router.get('/', ctrl.listContacts)
// router.get('/', async (req, res, next) => {
//   try {
//     const result = await contacts.listContacts()
//     res.json(result)
//   }
//   catch(error) {
//     next(error);
//   }
  
// })

router.get('/:contactId', ctrl.getContactById)
// router.get('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.getContactById(contactId)
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//   res.json(result)
//   }
//   catch (error) {
//     next(error);
//   }
  
// })

router.post('/', ctrl.addContact);

// router.post('/', async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, "missing required name field");
//     }
//     const result = await contacts.addContact(req.body);
//     res.status(201).json(result);
//   }
//   catch (error) {
//     next(error);
//   }
 
// })

router.delete('/:contactId', ctrl.removeContact);
// router.delete('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.removeContact(contactId);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//      res.json({
//       "message": "contact deleted"
//   })
//   }
//     catch (error) {
//       next(error)
//   }
// })


router.put('/:contactId', ctrl.updateContact);

// router.put('/:contactId', async (req, res, next) => {
//   try {
//      const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, "missing field");
//     }
//     const { contactId } = req.params;
//     const result = await contacts.updateContact(contactId, req.body);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }

//     res.json(result);
//   }
//   catch (error) {
//     next(error);
//   }
// })

module.exports = router
