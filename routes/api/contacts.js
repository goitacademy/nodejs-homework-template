const express = require('express');

const { userAuth, validation, ctrlWrapper } = require('../../middlewares');
const { joiSchema } = require('../../models/contacts');
const { contacts: controller } = require('../../controllers');

const router = express.Router();

router.get('/', userAuth, ctrlWrapper(controller.getAll));

router.get('/:contactId', ctrlWrapper(controller.getById));

router.post('/', userAuth, validation(joiSchema), ctrlWrapper(controller.add));

router.delete('/:contactId', ctrlWrapper(controller.removeById));

router.put('/:contactId', validation(joiSchema), ctrlWrapper(controller.updateById));

router.patch('/:contactId/favorite', ctrlWrapper(controller.updateFavorite));

module.exports = router;
