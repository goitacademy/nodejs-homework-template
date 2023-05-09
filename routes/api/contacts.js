const express = require('express');

const router = express.Router();

const cntrl = require('../../controllers/contacts')

const { validateBody, isValidId, authenticate } = require('../../middlewares');

const schemas = require('../../models/contact');


router.get('/', authenticate, cntrl.getAllContacts)

router.get('/:contactId', authenticate, isValidId, cntrl.getOneContactById)

router.post('/', authenticate, validateBody(schemas.addSchema), cntrl.addContact)

router.delete('/:contactId', authenticate, isValidId, cntrl.deleteContact)

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema), cntrl.updateContactById)

router.patch("/:contactId/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), cntrl.updateStatusContact);


module.exports = router


