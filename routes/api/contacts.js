const express = require('express');

const { contactMiddlewares } = require('../../middlewares');
const { contactControllers } = require('../../controllers');

const router = express.Router()


router.get('/', contactControllers.listContacts);

router.post('/', contactMiddlewares.checkCreateUserData, contactControllers.addContact)

router.get('/:contactId', contactMiddlewares.checkUserId, contactControllers.getContactById)

router.delete('/:contactId', contactMiddlewares.checkUserId, contactControllers.removeContact)

router.put('/:contactId', contactMiddlewares.checkUserId, contactMiddlewares.checkUpdateUserData, contactControllers.updateContact)

router.patch('/:contactId/favorite', contactMiddlewares.checkUserId, contactMiddlewares.checkupdateUserDatafavorite, contactControllers.updateContactFavorite)


module.exports = router
