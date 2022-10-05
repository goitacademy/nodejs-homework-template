const express = require('express');
const {validation, ctrlWrapper} = require('../../middlewares');
const { joiSchema } = require('../../models/contacts');
const { contacts: controller } = require('../../controllers');

const router = express.Router();

router.get('/', ctrlWrapper(controller.getAll));

router.get('/:contactId', ctrlWrapper(controller.getById));

router.post('/', validation(joiSchema), ctrlWrapper(controller.add));

router.delete('/:contactId', ctrlWrapper(controller.removeById));

router.put('/:contactId', validation(joiSchema), ctrlWrapper(controller.updateById));

router.patch('/:contactId/favorite', ctrlWrapper(controller.updateFavorite));

module.exports = router;
