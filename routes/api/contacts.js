const express = require('express');

const ctrl = require('../../controllers/contacts');

const router = express.Router()


router.get('/', ctrl.getAll);  

router.get('/:contactId', ctrl.getContactById);

router.post('/', ctrl.postContactById);

router.put('/:contactId', ctrl.putContactById);

router.delete('/:contactId', ctrl.deleteContactById);


module.exports = router;

