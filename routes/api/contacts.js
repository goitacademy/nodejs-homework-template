const express = require('express');

const { userMiddlewares } = require('../../middlewares/index');
const { userController } = require('../../controllers');

const router = express.Router()


router.get('/', userController.getContacts)

router.post('/', userMiddlewares.checkCreateUserData, userController.newContact)

router.get('/:contactId', userMiddlewares.checkUserId, userController.getContact)

router.delete('/:contactId', userMiddlewares.checkUserId, userController.deleteContact)

router.put('/:contactId', userMiddlewares.checkUserId, userMiddlewares.checkCreateUserData, userController.updateContact)

router.patch('/:contactId/favorite', userMiddlewares.checkUserId, userMiddlewares.checkupdateUserDatafavorite, userController.updateContact)


module.exports = router
