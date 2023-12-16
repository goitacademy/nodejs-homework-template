import express from "express";

import contactsControllers from '../../controllers/contactsControllers.js';

import {isEmptyBody} from "../../middlewares/index.js";


const contactsRouter = express.Router();


contactsRouter.get('/', contactsControllers.getAll);

contactsRouter.get('/:contactId', contactsControllers.getById);

contactsRouter.post('/',isEmptyBody, contactsControllers.postContacts);

contactsRouter.delete('/:contactId', contactsControllers.deleteById);

contactsRouter.put('/:contactId',isEmptyBody, contactsControllers.updateById);


export default contactsRouter;
