const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contactsCntrl')
const validateBody = require('../../middleware/validateBody');
const addSchema = require('../../schemas/addContactSchema');


router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', validateBody(addSchema), ctrl.addContact)

router.delete('/:contactId', ctrl.removeById)

router.put('/:contactId',  validateBody(addSchema), ctrl.updateById)


module.exports = router;
