const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers')

const { validateBody, isValidId } = require('../../middlewares');
const schemas = require('../../models/contact');


router.get('/', ctrl.getAllContacts)

router.get('/:contactId',isValidId, ctrl.getOneContactById)

router.post('/', validateBody(schemas.addSchema), ctrl.addContact)

router.delete('/:contactId', isValidId, ctrl.deleteContact)

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateContactById)

router.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);


module.exports = router


