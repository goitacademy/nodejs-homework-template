const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contactsCntrl')
const validateBody = require('../../middleware/validateBody');
const validation = require('../../middleware/validation');
const { addSchema, favoriteJoiSchema }= require('../../schemas/addContactSchema');



router.get('/', ctrl.getAll)

router.get('/:id', ctrl.getById)

router.post('/', validateBody(addSchema), ctrl.addContact)

router.delete('/:id', ctrl.removeById)

router.put('/:id',  validateBody(addSchema), ctrl.updateById)

router.patch('/:id/favorite', validation(favoriteJoiSchema), ctrl.updateStatusContact);


module.exports = router;
