import express from "express";

import contactsContollers from "../../controllers/contacts-contollers.js";

import {authenticate, isValidId, isEmptyBody, isFavoriteEmpty} from "../../middlewars/index.js"

import { validateBody } from "../../decorators/index.js";

import { contactAddSchema, contactUpdateFavotiteSchema } from "../../models/contact.js";



const contactAddValidate = validateBody(contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavotiteSchema)
const router = express.Router()

router.use(authenticate);

router.get('/', contactsContollers.getAll)

router.get('/:contactId', isValidId, contactsContollers.getContactById)

router.post('/', isEmptyBody, contactAddValidate, contactsContollers.addContact)

router.delete('/:contactId', isValidId, contactsContollers.deleteContact)

router.put('/:contactId', isValidId, isEmptyBody, contactAddValidate, contactsContollers.updateContact)

router.patch('/:contactId/favorite', isValidId, isEmptyBody, isFavoriteEmpty, contactUpdateFavoriteValidate, contactsContollers.updateContact)


export default router;