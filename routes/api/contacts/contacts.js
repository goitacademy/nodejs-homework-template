const express = require('express')
const router = express.Router()
const { validation, controllerWrapper } = require('../../../midddlewares')
const ctrl = require('../../../controlles')
const { joiSchema } = require('../../../schemas')

/* 1.Get all contacts.
   2.Get contact by id
   3.Add new contact
   4.Delete contact by id
   5.Update contact by id
*/

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:id', controllerWrapper(ctrl.getById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.add))

router.put('/:id', validation(joiSchema), controllerWrapper(ctrl.updateById))

router.delete('/:id', controllerWrapper(ctrl.removeById))

module.exports = router
