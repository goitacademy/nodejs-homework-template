const express = require('express')

const router = express.Router();

const ctrl = require('../../controllers/contacts')

const { ctrlWrapper } = require('../../helpers')

const { schemas } = require('../../models/contact')

const { validateBody, isValidId, authenticate } = require('../../meddlewares')


router.get('/', authenticate, ctrlWrapper(ctrl.getAll))

router.get('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.getById))

router.post('/', authenticate, validateBody(schemas.schemaBody), ctrlWrapper(ctrl.add))

router.delete('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.removeById))

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.schemaBody), ctrlWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.schemaUpdateFavorite), ctrlWrapper(ctrl.updateById))


module.exports = router
