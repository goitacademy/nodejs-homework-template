const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const {validateBody, isValidId, isEmptyBody, authenticate} = require('../../middlewares');
const schemas = require('../../schemas/contact');


router.get('/', authenticate, ctrl.getAll);

router.get('/:contactId', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.add);

router.put('/:contactId', authenticate, isValidId, isEmptyBody, validateBody(schemas.addSchema), ctrl.updateById);

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.favorite), ctrl.updateStatusById);

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteById);

module.exports = router;
