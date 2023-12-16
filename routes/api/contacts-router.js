import express from "express";
import contactsControler from "../../controler/contacts-controler.js";
import {isEmptyBody} from "../../middlewares/index.js";

const contactsRouter = express.Router()

contactsRouter.get('/', contactsControler.getAll);

contactsRouter.get('/:id', contactsControler.getById);

contactsRouter.post('/', isEmptyBody, contactsControler.addContact)

contactsRouter.delete('/:id', contactsControler.deleteContact )

contactsRouter.put('/:id', isEmptyBody, contactsControler.updateById)

export default contactsRouter;
