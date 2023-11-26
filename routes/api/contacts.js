const express = require('express');
const router = express.Router();
const controllerContacts = require('../../controllers/contacts');
const { validateBodyContacts } = require('../../middlewares');
const {joiSchema} = require('../../schemas/contacts');

router.get('/', controllerContacts.getAll);

router.get('/:contactId', controllerContacts.getById);

router.post('/', validateBodyContacts(joiSchema), controllerContacts.add);

router.delete('/:contactId', controllerContacts.remove);

router.put('/:contactId', validateBodyContacts(joiSchema), controllerContacts.update);

router.patch('/:contactId/favorite', controllerContacts.updateFavorite);

module.exports = router;
