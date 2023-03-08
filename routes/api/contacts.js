const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody,isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.post('/', validateBody(schemas.postContactSchema), ctrl.addContact);

router.put('/:contactId', validateBody(schemas.putContactSchema), ctrl.updateContactById);

router.delete('/:contactId', isValidId, ctrl.deleteContactById);

router.patch("/:contactId/favorite", isValidId, validateBody(schemas.patchContactSchema), ctrl.updateFavorite); 

module.exports = router;
