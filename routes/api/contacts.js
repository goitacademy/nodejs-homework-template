const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contactsCntrl')
const validateBody = require('../../middleware/validateBody');
const validationFavorite = require('../../middleware/validationFavorite');
const { isIdValid } = require('../../helpers');
const isTokenValid = require('../../middleware/isTokenValid');
const { addSchema, favoriteJoiSchema }= require('../../schemas/addContactSchema');



router.get('/', isTokenValid, ctrl.getAll)

router.get('/:id', isIdValid, isTokenValid, ctrl.getById)

router.post('/', validateBody(addSchema), isTokenValid, ctrl.addContact)

router.delete('/:id', isIdValid, isTokenValid, ctrl.removeById)

router.put('/:id', isIdValid, isTokenValid, validateBody(addSchema), ctrl.updateById)

router.patch('/:id/favorite', isIdValid, isTokenValid, validationFavorite(favoriteJoiSchema), ctrl.updateStatusContact);

// router.get('/', isTokenValid, ctrl.filterByStatus)


module.exports = router;
