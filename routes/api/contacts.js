/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const controllerWrapper = require('../../middlewares/controllerWrapper');
const authenticate = require('../../middlewares/authenticate');
const validation = require('../../middlewares/validation');
const { joiSchema, joiSchemaStatus } = require('../../model/contacts');
const { contacts: ctrl } = require('../../controllers');

router.get('/', authenticate, controllerWrapper(ctrl.getAll));

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getById));

router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.add));

router.delete('/:contactId', authenticate, controllerWrapper(ctrl.removeById));

router.patch('/:contactId', authenticate, validation(joiSchema), controllerWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', authenticate, validation(joiSchemaStatus), controllerWrapper(ctrl.updateStatus));

module.exports = router
