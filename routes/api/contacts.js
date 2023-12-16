const express = require('express');

const { userMiddlewares } = require('../../middlewares/index');
const { userController } = require('../../controllers');

const router = express.Router()


router.get('/', userController.getUsers)

router.post('/', userMiddlewares.checkCreateUserData, userController.newUser)

router.get('/:contactId', userMiddlewares.checkUserId, userController.getUser)

router.delete('/:contactId', userMiddlewares.checkUserId, userController.deleteUser)

router.patch('/:contactId', userMiddlewares.checkUserId, userController.updateUser)


module.exports = router
