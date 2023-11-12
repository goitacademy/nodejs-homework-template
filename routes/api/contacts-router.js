import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { isEmptyBody } from "../../middlewares/index.js";

//import contactsService from "../../models/index.js";

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getListContacts);

contactsRouter.get("/:id", contactsController.getContactById);

contactsRouter.post("/", isEmptyBody, contactsController.addContact);

contactsRouter.put("/:id", isEmptyBody, contactsController.updateById);

contactsRouter.delete("/:id", contactsController.deleteById);


export default contactsRouter;

