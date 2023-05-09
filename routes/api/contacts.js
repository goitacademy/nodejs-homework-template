const express = require('express');

const router = express.Router();

<<<<<<< HEAD
const cntrl = require('../../controllers')

const { validateBody, isValidId } = require('../../middlewares');
const schemas = require('../../models/contact');


router.get('/', cntrl.getAllContacts)

router.get('/:contactId',isValidId, cntrl.getOneContactById)

router.post('/', validateBody(schemas.addSchema), cntrl.addContact)

router.delete('/:contactId', isValidId, cntrl.deleteContact)

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), cntrl.updateContactById)

router.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), cntrl.updateStatusContact);


module.exports = router


=======
const cntrl = require('../../controllers/contacts')

const { validateBody } = require('../../middlewares');

const schemas = require('../../schemas/contacts');


router.get('/', cntrl.getAll)

router.get('/:contactId', cntrl.getById)

router.post('/', validateBody(schemas.addSchema), cntrl.add)

router.delete('/:contactId', cntrl.deleteById)

router.put('/:contactId', validateBody(schemas.addSchema), cntrl.updateById)
  


module.exports = router
>>>>>>> master
