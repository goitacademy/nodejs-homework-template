const express = require('express');
const {usersApi}  = require('../../controllers');
const {joiRegisterSchema, joiLoginSchema, joiSubscriptionSchema} = require('../../models')
const { ctrlWrapper, validation, auth} = require('../../middlewares') 
const router = express.Router();

router.post('/signup', validation(joiRegisterSchema), ctrlWrapper(usersApi.register));
router.post('/login', validation(joiLoginSchema), ctrlWrapper(usersApi.login));
router.get('/current', auth, ctrlWrapper(usersApi.getCurrent));
router.get('/logout', auth, ctrlWrapper(usersApi.logout));
router.patch('/', auth, validation(joiSubscriptionSchema), ctrlWrapper(usersApi.putchSubscription));
module.exports = router;
 