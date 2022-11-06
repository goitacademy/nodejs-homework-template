const express = require('express');
const contactController = require('../../controllers/contactController');
const { tryCatchWrapper } = require('../../helpers/index');
const { schemaPatch, schemaCreate } = require('../../models/contactModel');
const { validateRequest } = require('../../middlewares/validateRequest');

const contactsRouter = express.Router();

contactsRouter.get("/", tryCatchWrapper(contactController.listContacts));
contactsRouter.get("/:id", tryCatchWrapper(contactController.getContactById));
contactsRouter.post("/", validateRequest(schemaCreate), tryCatchWrapper(contactController.addContact));
contactsRouter.delete("/:id", tryCatchWrapper(contactController.removeContact));
contactsRouter.put("/:id", validateRequest(schemaCreate), tryCatchWrapper(contactController.updateContact));
contactsRouter.patch("/:id/favorite", validateRequest(schemaPatch), tryCatchWrapper(contactController.updateStatusContact));

// contactsRouter.get('/', async (req, res, next) => {
//   try {
//     const allContacts = await contacts.listContacts();
//     res.json(allContacts);
//   } catch (err) {
//     next(err);
//   }
// });

// contactsRouter.get('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const contact = await contacts.getContactById(contactId);
//     if (!contact) {
//       throw createError(404, "Not found");
//     }
//     res.json(contact);
//   } catch (err) {
//     next(err);
//   }
// });

// contactsRouter.post('/', async (req, res, next) => {
//   try {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       throw createError(400, error.message);
//     }
//     const { name, email, phone } = req.body;
//     const contact = await contacts.addContact(name, email, phone);
//     res.status(201).json(contact);
//   } catch (err) {
//     next(err);
//   }
// });

// contactsRouter.delete('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const contact = await contacts.removeContact(contactId);
//     if (!contact) {
//       throw createError(404, "Not found");
//     }
//     res.status(204).json();
//   } catch (err) {
//     next(err);
//   }
// });

// contactsRouter.put('/:contactId', async (req, res, next) => {
//   try {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       throw createError(400, error.message);
//     }
//     const { name, email, phone } = req.body;
//     const { contactId } = req.params;
//     const contact = await contacts.updateContact(contactId, name, email, phone);
//     if (!contact) {
//       throw createError(404, "Not found");
//     }
//     res.json(contact);
//   } catch(err) {
//     next(err);
//   }
// });

module.exports = {contactsRouter };