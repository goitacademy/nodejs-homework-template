const express = require('express');
const { controllerWrapper, validateBody } = require('../../helpers');
const { getAll, getOneById, add, removeById, updateById } = require('../../controllers/contacts');
const { addSchema, updateSchema } = require('../../schemas/contactsShema');

const router = express.Router();

router.get('/', controllerWrapper(getAll));

router.get('/:contactId', controllerWrapper(getOneById));

router.post('/', validateBody(addSchema), controllerWrapper(add));

router.delete('/:contactId', controllerWrapper(removeById));

router.put('/:contactId', validateBody(updateSchema), controllerWrapper(updateById));

module.exports = router;
