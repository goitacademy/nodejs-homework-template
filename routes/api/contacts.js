/* eslint-disable new-cap */
const express = require('express');
const { controllerWrapper, validation } = require('../../middlewares/index');
const { contactSchema } = require('../../schemas/index');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', controllerWrapper(ctrl.getAll));

router.get('/:contactId', controllerWrapper(ctrl.getById));

router.post('/', validation(contactSchema), controllerWrapper(ctrl.add));

router.delete('/:contactId', controllerWrapper(ctrl.removeById));

router.patch('/:contactId', validation(contactSchema), controllerWrapper(ctrl.updateById))

module.exports = router
