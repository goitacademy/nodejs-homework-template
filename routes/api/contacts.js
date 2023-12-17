const express = require('express');

const { userMiddlewares } = require('../../middlewares/index');
const { userController } = require('../../controllers');

const router = express.Router()


router.get('/', userController.getUsers)

router.post('/', userMiddlewares.checkCreateUserData, userController.newUser)

router.get('/:contactId', userMiddlewares.checkUserId, userController.getUser)

router.delete('/:contactId', userMiddlewares.checkUserId, userController.deleteUser)

router.patch('/:contactId', userMiddlewares.checkUserId, userMiddlewares.checkCreateUserData, userController.updateUser)

router.patch('/:contactId/favorite', userMiddlewares.checkUserId, userMiddlewares.checkupdateUserDatafavorite, userController.favorite)


module.exports = router
