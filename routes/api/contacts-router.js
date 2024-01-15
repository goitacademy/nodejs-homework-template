import express from "express";

import controllersContact  from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/isEmptyBody.js";


const contactsRouter = express.Router()

contactsRouter.get('/',controllersContact.getAll)

contactsRouter.get('/:contactId', controllersContact.getById)

contactsRouter.post('/',isEmptyBody, controllersContact.add)

contactsRouter.delete('/:contactId', controllersContact.deleteById)

contactsRouter.put('/:contactId', isEmptyBody, controllersContact.updateById)

export default contactsRouter;