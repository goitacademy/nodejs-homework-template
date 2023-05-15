const express = require('express');

const router = express.Router();

const cntrl = require('../../controllers')

const { validateBody, isValidId } = require('../../middlewares');

const schemas = require('../../schemas/contacts');


router.get('/', cntrl.getAllContacts)

router.get('/:contactId', isValidId, cntrl.getOneContactById)

router.post('/', validateBody(schemas.addSchema), cntrl.addContact)

router.delete('/:contactId', isValidId, cntrl.deleteContact)

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), cntrl.updateContactById)
  
router.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), cntrl.updateStatusContact);

module.exports = router;
