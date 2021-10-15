const express = require('express')
const router = express.Router()

const { joiUserSchema, updateSubscriptionJoiSchema } = require('../../models/user')
const { controllerWrapper, validation, authenticate } = require('../../middleware')
const { auth: ctrs } = require('../../controllers')

router.post('/register', validation(joiUserSchema), controllerWrapper(ctrs.register))
router.post('/login', validation(joiUserSchema), controllerWrapper(ctrs.login))
router.get('/logout', authenticate, controllerWrapper(ctrs.logout))
router.get('/current', authenticate, controllerWrapper(ctrs.getUserByToken))
router.patch('/:userId/subscription', validation(updateSubscriptionJoiSchema), controllerWrapper(ctrs.updateUserSubscription))

module.exports = router
