const express = require('express');

const { userMiddlewares } = require('../../middlewares/index');
const { contactControllers } = require('../../controllers');

const router = express.Router()


router.get('/', contactControllers.getContacts)

router.post('/', userMiddlewares.checkCreateUserData, contactControllers.newContact)

router.get('/:contactId', userMiddlewares.checkUserId, contactControllers.getContact)

router.delete('/:contactId', userMiddlewares.checkUserId, contactControllers.deleteContact)

router.put('/:contactId', userMiddlewares.checkUserId, userMiddlewares.checkCreateUserData, contactControllers.updateContact)

router.patch('/:contactId/favorite', userMiddlewares.checkUserId, userMiddlewares.checkupdateUserDatafavorite, contactControllers.updateContact)


module.exports = router
