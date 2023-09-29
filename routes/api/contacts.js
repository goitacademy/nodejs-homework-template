import express from "express";

import contactsContollers from "../../controllers/contacts-contollers.js";

import isEmptyBody from "../../middlewars/isEmptyBody.js";

import { validateBody } from "../../decorators/index.js";

import { contactAddSchema } from "../../schemas/contact-schemas.js";

const contactAddValidate = validateBody(contactAddSchema);

const router = express.Router()


router.get('/', contactsContollers.getAll)

router.get('/:contactId', contactsContollers.getContactById)

router.post('/',isEmptyBody, contactAddValidate, contactsContollers.addContact)

router.delete('/:contactId', contactsContollers.deleteContact)

router.put('/:contactId', isEmptyBody, contactAddValidate, contactsContollers.updateContact)

export default router;