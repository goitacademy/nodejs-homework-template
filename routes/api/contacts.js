const express = require('express')
const ctrl = require('../../controllers/contacts')
// const isValidId = require('../../midlewares')
const router = express.Router()
router.get('/', ctrl.getAllContacts);

router.get('/:id', ctrl.getById);

router.post('/', ctrl.addOneContact);

router.delete('/:id',  ctrl.deleteContactById);

router.put('/:id',  ctrl.updateContactById);

// router.patch('/id/favorite',  ctrl.updateContactById)
  
module.exports = router
