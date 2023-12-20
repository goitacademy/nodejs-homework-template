import express from "express";
import contactsControler from "../../controler/contacts-controler.js";
import {isEmptyBody, isNotFoundAdd, isNotFoundUpdate} from "../../middlewares/index.js";

const contactsRouter = express.Router()

contactsRouter.get('/', contactsControler.getAll);

contactsRouter.get('/:id', contactsControler.getById);

contactsRouter.post('/', isEmptyBody, isNotFoundAdd, contactsControler.addContact)

contactsRouter.delete('/:id', contactsControler.deleteContact )

contactsRouter.put('/:id', isEmptyBody, isNotFoundUpdate, contactsControler.updateById)

export default contactsRouter;
