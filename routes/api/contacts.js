const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/contacts');
const { schemas } = require('../../models/contact');

const { validateBody, isValidId } = require('../../middlewares');


router.get('/', ctrl.getAll)

router.get('/:contactId', isValidId, ctrl.getById)

router.post('/', validateBody(schemas.addSchema), ctrl.add)

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateById)

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.schemaUpdateFavorite), ctrl.updateById)

router.delete('/:contactId', isValidId, ctrl.removeById)

module.exports = router
