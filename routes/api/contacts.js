const express = require('express')
const ctrl = require('../../controllers/contacts')
const {isValidId, validateBody} = require('../../midlewares')
const {addSchema, updateFavoriteSchema} = require('../../schema/schema')
const router = express.Router()

router.get('/', ctrl.getAllContacts);

router.get('/:id', isValidId, ctrl.getById);

router.post('/', validateBody(addSchema), ctrl.addOneContact);

router.delete('/:id', isValidId,  ctrl.deleteContactById);

router.put('/:id', isValidId, validateBody(addSchema), ctrl.updateContactById);

router.patch('/:id/favorite', isValidId, validateBody(updateFavoriteSchema), ctrl.updateFavorite)
  
module.exports = router
