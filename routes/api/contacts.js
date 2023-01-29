const express = require('express');
const routerContacts = express.Router();
const ctrlTasks = require("../../controllers/contacts.controller.js");
const { tryCatchWrapper} = require("../../models/helpers/index.js")
const { validateBody, isValidId } = require("../../middelwares/index")
const { schemas } = require("../../models/contact");


routerContacts.get('/',
    tryCatchWrapper(ctrlTasks.getContactsService));

routerContacts.get('/:id',
    isValidId,
    tryCatchWrapper(ctrlTasks.getContactByIdService));

routerContacts.post('/',
    validateBody(schemas.addContactSchema),
    tryCatchWrapper(ctrlTasks.creacteContactService));

routerContacts.delete('/:id',
    isValidId,
    tryCatchWrapper(ctrlTasks.deleteContactService));
 
routerContacts.put('/:id',
    isValidId,
    validateBody(schemas.addContactSchema),
    tryCatchWrapper(ctrlTasks.updateContactService));

routerContacts.patch('/:id/favorite',
    isValidId,
    validateBody(schemas.updateFavoriteSchema),
    tryCatchWrapper(ctrlTasks.updateFavoriteService))


module.exports = { routerContacts };
