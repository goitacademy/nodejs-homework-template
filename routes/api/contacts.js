const express = require('express');




const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewars");
const { schemas } = require("../../models/contact");

router.get('/', ctrl.getAll);

router.get("/:contactId",isValidId, ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContacts);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete("/:contactId", ctrl.deleteContacts);

router.put("/:contactId",isValidId, validateBody(schemas.addSchema), ctrl.changeContacts);

module.exports = router;
