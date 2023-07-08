const express = require('express')
const ctrl = require('../../controllers/contacts')
const isValidId = require('../../midlewares')
const router = express.Router()
router.get('/', ctrl.getAllContacts);

router.get('/:id', isValidId, ctrl.getById);

router.post('/', ctrl.addOneContact);

router.delete('/:id', isValidId,  ctrl.deleteContactById);

router.put('/:id', isValidId,  ctrl.updateContactById);

router.patch('/:id/favorite', isValidId,  ctrl.updateFavorite)
  
module.exports = router
