/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const controllerWrapper = require('../../middlewares/controllerWrapper');
const validation = require('../../middlewares/validation')
const { joiSchema, joiSchemaStatus } = require('../../model/contacts');
const { contacts: ctrl } = require('../../controllers');

router.get('/', controllerWrapper(ctrl.getAll));

router.get('/:contactId', controllerWrapper(ctrl.getById));

router.post('/', validation(joiSchema), controllerWrapper(ctrl.add));

router.delete('/:contactId', controllerWrapper(ctrl.removeById));

router.patch('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', validation(joiSchemaStatus), controllerWrapper(ctrl.updateStatus));

module.exports = router
