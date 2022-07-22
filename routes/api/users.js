const express = require('express')
const {validation, ctrlWrapper, auth} = require('../../middlewares')
const ctrl = require('../../controllers/users')
const {joiSignUpSchema, joiLoginSchema, subscriptionJoiSchema} = require('../../models/user')
const router = express.Router()

router.post('/signup', validation(joiSignUpSchema), ctrlWrapper(ctrl.signUp));
router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));
router.patch('/', auth, validation(subscriptionJoiSchema), ctrlWrapper(ctrl.updateSub));
module.exports = router