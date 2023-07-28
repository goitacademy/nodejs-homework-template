const express = require('express');
const ctrl = require('../../controllers/contacts');
const {validateBody, isValidId} = require('../../middlewares')
const {shemas} = require('../../models/contact')
const router = express.Router()


router.get('/', ctrl.getAll )

router.get('/:contactId', isValidId, ctrl.getById)

router.post('/',  validateBody(shemas.addSchema),  ctrl.add )

router.delete('/:contactId', isValidId, ctrl.deleteById)

router.put('/:contactId', validateBody(shemas.addSchema), isValidId, ctrl.update)

router.patch('/:contactId/favorite', validateBody(shemas.isFavoriteSchema), isValidId, ctrl.updateFavorite)


module.exports = router;

