const express = require('express')

const router = express.Router();

const ctrl = require('../../controllers/contacts')

const { ctrlWrapper } = require('../../helpers')

const { schemas } = require('../../models/contact')

const { validateBody, isValidId } = require('../../meddlewares')


router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById))

router.post('/', validateBody(schemas.schemaBody), ctrlWrapper(ctrl.add))

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeById))

router.put('/:contactId', isValidId, validateBody(schemas.schemaBody), ctrlWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.schemaUpdateFavorite), ctrlWrapper(ctrl.updateById))


module.exports = router
