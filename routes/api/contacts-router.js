import express from "express";
import contactsController from "../../controllers/contactsController.js"
import contactValidator from "../../middlewars/contactValidator.js";
import isValidId from "../../middlewars/isValidId.js";
import isEmptyBody from "../../middlewars/isEmptyBody.js";
import isEmptyBodyFavorite from "../../middlewars/isEmptyBodyFavorite.js";
import favoriteValidate from "../../middlewars/favoriteValidate.js";
import authenticate from "../../middlewars/authenticate.js";


const routerContacts = express.Router();

routerContacts.use(authenticate);

routerContacts.get('/', contactsController.getAll);

routerContacts.get('/:contactId', isValidId, contactsController.getById);

routerContacts.post('/', isEmptyBody, contactValidator, contactsController.add);

routerContacts.delete('/:contactId', isValidId, contactsController.deleteById);

routerContacts.put('/:contactId', isEmptyBody, isValidId, contactValidator, contactsController.updateById);

routerContacts.patch('/:contactId/favorite', isEmptyBodyFavorite, isValidId, favoriteValidate, contactsController.updateStatusContact )

export default routerContacts;
