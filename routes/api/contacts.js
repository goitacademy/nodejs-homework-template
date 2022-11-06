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


module.exports = {contactsRouter };