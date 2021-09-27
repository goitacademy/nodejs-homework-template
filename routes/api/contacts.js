const express = require('express')

const { controllerWrapper } = require('../../mildlewares/controllerWrapper')
const { validation } = require('../../mildlewares/validation')
const contactSchemas = require('../../schemas')
const controllers = require('../../controllers/contacts')

const router = express.Router()

router.get('/', controllerWrapper(controllers.getAll))

router.get('/:contactId', controllerWrapper(controllers.getById))

router.post('/', validation(contactSchemas.joiStrictSchema), controllerWrapper(controllers.add))

router.delete('/:contactId', controllerWrapper(controllers.deleteById))

router.patch('/:contactId', validation(contactSchemas.joiOptionalSchema), controllerWrapper(controllers.updateById))

module.exports = router
