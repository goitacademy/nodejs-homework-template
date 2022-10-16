const express = require('express');

const { validation, ctrlWrapper } = require('../../middlewares')
const { contactSchema } = require('../../schemas');
const { contacts: ctrl } = require('../../controllers');

const validationMiddleware = validation(contactSchema);

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:id', ctrlWrapper(ctrl.getById))

router.post('/', validationMiddleware, ctrlWrapper(ctrl.add))

router.put('/:id', validationMiddleware, ctrlWrapper(ctrl.updateById))

router.delete('/:id', ctrlWrapper(ctrl.removeById))

module.exports = router
