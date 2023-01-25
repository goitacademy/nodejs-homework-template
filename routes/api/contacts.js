const express = require("express");
const { tryCatchWrapper} = require("../../models/helpers/index.js")
const { getContactsService, getContactService, creacteContactService, deleteContactService, updateContactService} = require("../../controllers/contacts.controller.js")
const { validateBody } = require("../../middelwares/index")
const { addContactSchema } = require("../../schemas/contactShema");
const routerContacts = express.Router();

routerContacts.get('/',
    tryCatchWrapper(getContactsService));

routerContacts.get('/:id',
    tryCatchWrapper(getContactService));

routerContacts.post('/',
    validateBody(addContactSchema),
    tryCatchWrapper(creacteContactService));

routerContacts.delete('/:id',
    tryCatchWrapper(deleteContactService));
 
routerContacts.put('/:id',
    validateBody(addContactSchema),
    tryCatchWrapper(updateContactService));

module.exports = { routerContacts };
