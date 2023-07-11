const express = require('express');
const { controllerWrapper, validateBody } = require('../../helpers');
const {
	getAll,
	getOneById,
	add,
	removeById,
	updateById,
	updateFavoriteById,
} = require('../../controllers/contacts');
const { schema, updateFavoriteSchema } = require('../../schemas/contactsShema');

const router = express.Router();

router.get('/', controllerWrapper(getAll));

router.get('/:contactId', controllerWrapper(getOneById));

router.post('/', validateBody(schema), controllerWrapper(add));

router.delete('/:contactId', controllerWrapper(removeById));

router.put('/:contactId', validateBody(schema), controllerWrapper(updateById));

router.patch(
	'/:contactId/favorite',
	validateBody(updateFavoriteSchema),
	controllerWrapper(updateFavoriteById)
);

module.exports = router;
