import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import contactValidation from "../../middlewara/validation/contact-validation.js";

const contactRouter = express.Router()

contactRouter.get('/', contactsController.getAll);

contactRouter.get('/:id', contactsController.getById);

contactRouter.post('/', contactValidation.addContactValidate, contactsController.add);

contactRouter.put('/:id', contactValidation.addContactValidate, contactsController.updateById);
 
contactRouter.delete('/:id', contactsController.deleteById);

export default contactRouter;
