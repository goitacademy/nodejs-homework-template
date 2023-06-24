const express = require('express');
const controllers = require('../../../controllers/users');

const router = express.Router();
const {validateBody} = require('../../../middlewares')
const {userSchemaJoi, userSchemaJoiLogin, updateSubscriptionSchemaJoi} = require('../../../models/user/userModel');
const { authenticate } = require('../../../middlewares');

router.post('/register', validateBody(userSchemaJoi), controllers.registerUser);

router.post('/login', validateBody(userSchemaJoiLogin), controllers.loginUser);

router.get('/current', authenticate, controllers.getCurrent);

router.post('/logout', authenticate, controllers.logOut);

router.patch('/:id/subscription', validateBody(updateSubscriptionSchemaJoi), authenticate, controllers.subscriptionUpdate);

module.exports = router;