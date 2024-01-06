const express = require('express');

const { contactMiddlewares, userAuthMiddlewares } = require('../../middlewares');
const { contactControllers } = require('../../controllers');

const router = express.Router()

router.use(userAuthMiddlewares.protect);

router.get('/', contactControllers.listContacts);

router.post('/', contactMiddlewares.checkCreateUserData, contactControllers.addContact)

router.get('/:contactId', contactMiddlewares.checkContactId, contactControllers.getContactById)

router.delete('/:contactId', contactMiddlewares.checkContactId, contactControllers.removeContact)

router.put('/:contactId', contactMiddlewares.checkContactId, contactMiddlewares.checkUpdateUserData, contactControllers.updateContact)

router.patch('/:contactId/favorite', contactMiddlewares.checkContactId, contactMiddlewares.checkupdateContactDatafavorite, contactControllers.updateContactFavorite)


module.exports = router
