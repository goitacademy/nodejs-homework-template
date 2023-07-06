const express = require('express')
const ctrl = require('../../controllers/contacts')

const router = express.Router()
router.get('/', ctrl.getAllContacts);

router.get('/:id', ctrl.getById);

router.post('/', ctrl.addOneContact);

router.delete('/:id', ctrl.deleteContactById);

router.put('/:id', ctrl.updateContactById);
  
module.exports = router
