const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contactsCntrl')
const validateBody = require('../../middleware/validateBody');
const validationFavorite = require('../../middleware/validationFavorite');
const { isIdValid } = require('../../helpers');
const { addSchema, favoriteJoiSchema }= require('../../schemas/addContactSchema');



router.get('/', ctrl.getAll)

router.get('/:id', isIdValid, ctrl.getById)

router.post('/', validateBody(addSchema), ctrl.addContact)

router.delete('/:id', isIdValid, ctrl.removeById)

router.put('/:id', isIdValid, validateBody(addSchema), ctrl.updateById)

router.patch('/:id/favorite', isIdValid, validationFavorite(favoriteJoiSchema), ctrl.updateStatusContact);


module.exports = router;
