const express = require('express')
const router = express.Router()
const controllers = require('../../controllers')
const ctrlWrapper = require('../../helpers/ctrlWrapper')
const validateBody = require('../../middlewares/validateBody')
const schemas = require('../../schemas')


router.get('/', ctrlWrapper(controllers.getAll))

router.get('/:contactId', ctrlWrapper(controllers.getById))

router.post('/', validateBody(schemas.addSchema), ctrlWrapper(controllers.add))

router.delete('/:contactId', ctrlWrapper(controllers.remove))

router.patch('/:contactId', validateBody(schemas.updateSchema, "missing fields"), ctrlWrapper(controllers.update))

module.exports = router
