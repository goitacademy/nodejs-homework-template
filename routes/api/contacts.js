const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const {validateBody, isValidId, authorization} = require('../../middlewares')
const {schemas} = require('../../models/contact');

router.get('/',authorization, ctrl.getAll);

router.get('/:id',authorization, isValidId, ctrl.getById);

router.post('/', authorization, validateBody(schemas.addSchema), ctrl.addContact);

router.put('/:contactId',authorization, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.delete('/:contactId',authorization, isValidId, ctrl.deleteById);

router.patch('/:contactId/favorite', authorization, isValidId, validateBody(ctrl.updateFavorite), ctrl.updateFavorite)

module.exports = router;
