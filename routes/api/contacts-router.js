import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import contactsService from "../../models/index.js";

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getListContacts);

contactsRouter.get("/:id", contactsController.getContactById);

contactsRouter.post('/', contactsController.addContact);


contactsRouter.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

contactsRouter.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

export default contactsRouter;

